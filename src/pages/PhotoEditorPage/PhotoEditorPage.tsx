import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
  Slider,
  Badge,
  Grid,
  Dialog,
  Separator,
  ScrollArea,
} from '@radix-ui/themes';
import { CameraIcon, UploadIcon, InfoCircledIcon, ReloadIcon, DownloadIcon, VideoIcon } from '@radix-ui/react-icons';

interface ImageMetadata {
  fileName: string;
  fileSize: string;
  fileType: string;
  dimensions: string;
  lastModified: string;
  aspectRatio: string;
  aperture: string;
  shutterSpeed: string;
  iso: string;
}

interface FilmFilter {
  name: string;
  filter: string;
}

const PhotoEditorPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>('none');
  const [brightness, setBrightness] = useState<number[]>([100]);
  const [contrast, setContrast] = useState<number[]>([100]);
  const [saturation, setSaturation] = useState<number[]>([100]);
  const [showMetadata, setShowMetadata] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // 필름 시뮬레이션 필터들
  const filmFilters: Record<string, FilmFilter> = {
    none: { name: '원본', filter: 'none' },
    vintage: {
      name: '빈티지',
      filter: 'sepia(0.3) contrast(1.2) brightness(0.9) saturate(0.8)',
    },
    kodak: {
      name: 'Kodak Gold',
      filter: 'contrast(1.15) saturate(1.3) brightness(1.1) hue-rotate(10deg)',
    },
    fuji: {
      name: 'Fuji Velvia',
      filter: 'contrast(1.3) saturate(1.5) brightness(0.95) hue-rotate(-5deg)',
    },
    polaroid: {
      name: 'Polaroid',
      filter: 'contrast(0.9) saturate(1.1) brightness(1.2) sepia(0.1)',
    },
    blackwhite: {
      name: '흑백',
      filter: 'grayscale(1) contrast(1.1)',
    },
    cinema: {
      name: '시네마틱',
      filter: 'contrast(1.2) saturate(0.8) brightness(0.9) hue-rotate(15deg)',
    },
  };

  // EXIF 데이터 시뮬레이션
  const extractExposureData = (): Pick<ImageMetadata, 'aperture' | 'shutterSpeed' | 'iso'> => {
    const apertures = ['f/1.4', 'f/1.8', 'f/2.8', 'f/4.0', 'f/5.6', 'f/8.0'];
    const shutterSpeeds = ['1/60', '1/125', '1/250', '1/500', '1/1000'];
    const isos = ['100', '200', '400', '800', '1600'];

    return {
      aperture: apertures[Math.floor(Math.random() * apertures.length)],
      shutterSpeed: shutterSpeeds[Math.floor(Math.random() * shutterSpeeds.length)],
      iso: `ISO ${isos[Math.floor(Math.random() * isos.length)]}`,
    };
  };

  // 이미지 메타데이터 추출
  const extractMetadata = (file: File, img: HTMLImageElement): void => {
    const exposureData = extractExposureData();
    const metadata: ImageMetadata = {
      fileName: file.name,
      fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      fileType: file.type,
      dimensions: `${img.naturalWidth} x ${img.naturalHeight}`,
      lastModified: new Date(file.lastModified).toLocaleString('ko-KR'),
      aspectRatio: (img.naturalWidth / img.naturalHeight).toFixed(2),
      ...exposureData,
    };
    setImageMetadata(metadata);
  };

  // 파일 선택 처리
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          setSelectedImage(e.target?.result as string);
          extractMetadata(file, img);
          resetSettings();
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // 설정 초기화
  const resetSettings = (): void => {
    setCurrentFilter('none');
    setBrightness([100]);
    setContrast([100]);
    setSaturation([100]);
  };

  // 갤러리에서 사진 선택
  const selectFromGallery = (): void => {
    fileInputRef.current?.click();
  };

  // 필터 적용된 스타일 생성
  const getFilteredStyle = (): React.CSSProperties => {
    const baseFilter = filmFilters[currentFilter]?.filter || 'none';
    const adjustments = `brightness(${brightness[0]}%) contrast(${contrast[0]}%) saturate(${saturation[0]}%)`;

    return {
      filter: baseFilter === 'none' ? adjustments : `${baseFilter} ${adjustments}`,
      transition: 'filter 0.3s ease',
    };
  };

  // 이미지 다운로드
  const downloadImage = (): void => {
    if (!selectedImage || !canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;

    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // 필터 적용
    ctx.filter = getFilteredStyle().filter || 'none';
    ctx.drawImage(img, 0, 0);

    // 다운로드
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `miku_edited_${Date.now()}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      },
      'image/jpeg',
      0.9
    );
  };

  return (
    <Container size="4" px="4" py="6">
      {/* 헤더 */}
      <Box mb="6" style={{ textAlign: 'center' }}>
        <Flex align="center" justify="center" gap="3" mb="2">
          <CameraIcon width="32" height="32" />
          <Heading size="8">Photo Editor</Heading>
        </Flex>
        <Text color="gray" size="4">
          필름 시뮬레이션으로 사진을 편집하세요
        </Text>
      </Box>

      {!selectedImage ? (
        /* 사진 선택 화면 */
        <Card size="4">
          <Box py="9" style={{ textAlign: 'center' }}>
            <UploadIcon width="64" height="64" style={{ margin: '0 auto 24px' }} color="gray" />
            <Heading size="6" mb="4">
              사진을 선택하세요
            </Heading>
            <Button size="4" onClick={selectFromGallery}>
              <UploadIcon width="16" height="16" />
              갤러리에서 선택
            </Button>
          </Box>
        </Card>
      ) : (
        <Grid columns={{ initial: '1', md: '2' }} gap="6">
          {/* 이미지 영역 */}
          <Box>
            <Card>
              <Box position="relative">
                <img
                  ref={imageRef}
                  src={selectedImage}
                  alt="편집할 사진"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 'var(--radius-3)',
                    ...getFilteredStyle(),
                  }}
                />
              </Box>
            </Card>

            {/* 액션 버튼들 */}
            <Flex gap="2" mt="4" wrap="wrap">
              <Dialog.Root open={showMetadata} onOpenChange={setShowMetadata}>
                <Dialog.Trigger>
                  <Button variant="soft" size="2">
                    <InfoCircledIcon width="16" height="16" />
                    정보
                  </Button>
                </Dialog.Trigger>
                <Dialog.Content style={{ maxWidth: '450px' }}>
                  <Dialog.Title>사진 정보</Dialog.Title>
                  {imageMetadata && (
                    <Box mt="4">
                      <Text size="2" weight="bold" mb="2" as="div">
                        노출 정보
                      </Text>
                      <Flex gap="2" mb="4">
                        <Badge variant="soft">{imageMetadata.aperture}</Badge>
                        <Badge variant="soft">{imageMetadata.shutterSpeed}</Badge>
                        <Badge variant="soft">{imageMetadata.iso}</Badge>
                      </Flex>

                      <Box style={{ fontSize: '14px', lineHeight: '1.6' }}>
                        <Text as="div">
                          <strong>파일명:</strong> {imageMetadata.fileName}
                        </Text>
                        <Text as="div">
                          <strong>크기:</strong> {imageMetadata.fileSize}
                        </Text>
                        <Text as="div">
                          <strong>해상도:</strong> {imageMetadata.dimensions}
                        </Text>
                        <Text as="div">
                          <strong>비율:</strong> {imageMetadata.aspectRatio}:1
                        </Text>
                        <Text as="div">
                          <strong>수정일:</strong> {imageMetadata.lastModified}
                        </Text>
                      </Box>
                    </Box>
                  )}
                </Dialog.Content>
              </Dialog.Root>

              <Button variant="soft" size="2" onClick={resetSettings}>
                <ReloadIcon width="16" height="16" />
                초기화
              </Button>

              <Button size="2" onClick={downloadImage}>
                <DownloadIcon width="16" height="16" />
                다운로드
              </Button>

              <Button variant="outline" size="2" onClick={selectFromGallery}>
                <UploadIcon width="16" height="16" />
                다른 사진
              </Button>
            </Flex>
          </Box>

          {/* 편집 컨트롤 */}
          <Box>
            <Card>
              <Box p="4">
                {/* 필름 필터 */}
                <Box mb="6">
                  <Flex align="center" gap="2" mb="3">
                    <VideoIcon width="16" height="16" />
                    <Heading size="4">필름 시뮬레이션</Heading>
                  </Flex>
                  <ScrollArea>
                    <Flex gap="2" pb="2">
                      {Object.entries(filmFilters).map(([key, filter]) => (
                        <Button
                          key={key}
                          variant={currentFilter === key ? 'solid' : 'soft'}
                          size="2"
                          onClick={() => setCurrentFilter(key)}
                          style={{ flexShrink: 0 }}
                        >
                          {filter.name}
                        </Button>
                      ))}
                    </Flex>
                  </ScrollArea>
                </Box>

                <Separator size="4" mb="6" />

                {/* 세부 조정 */}
                <Box>
                  <Heading size="4" mb="4">
                    세부 조정
                  </Heading>

                  <Box mb="4">
                    <Flex justify="between" align="center" mb="2">
                      <Text size="2" weight="medium">
                        밝기
                      </Text>
                      <Text size="2" color="gray">
                        {brightness[0]}%
                      </Text>
                    </Flex>
                    <Slider value={brightness} onValueChange={setBrightness} min={50} max={150} step={1} />
                  </Box>

                  <Box mb="4">
                    <Flex justify="between" align="center" mb="2">
                      <Text size="2" weight="medium">
                        대비
                      </Text>
                      <Text size="2" color="gray">
                        {contrast[0]}%
                      </Text>
                    </Flex>
                    <Slider value={contrast} onValueChange={setContrast} min={50} max={150} step={1} />
                  </Box>

                  <Box>
                    <Flex justify="between" align="center" mb="2">
                      <Text size="2" weight="medium">
                        채도
                      </Text>
                      <Text size="2" color="gray">
                        {saturation[0]}%
                      </Text>
                    </Flex>
                    <Slider value={saturation} onValueChange={setSaturation} min={0} max={200} step={1} />
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </Grid>
      )}

      {/* 숨겨진 요소들 */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </Container>
  );
};

export default PhotoEditorPage;
