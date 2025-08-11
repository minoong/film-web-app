import { useRef, useState, useEffect, useCallback } from 'react';
import { Box, Button, Flex, Heading, Text, Slider } from '@radix-ui/themes';
import { DownloadIcon, ResetIcon, Share1Icon, ImageIcon } from '@radix-ui/react-icons';

export function Capture() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgDataUrl, setImgDataUrl] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // 파일 선택 처리
  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('이미지 파일만 선택할 수 있습니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      if (imageUrl) {
        // 원본 이미지 로드
        const img = new Image();
        img.onload = () => {
          setOriginalImage(img);
          applyFilters(img);
          setError(null);
        };
        img.src = imageUrl;
      }
    };
    reader.onerror = () => {
      setError('파일을 읽는 중 오류가 발생했습니다.');
    };
    reader.readAsDataURL(file);
  }

  // 필터 적용
  const applyFilters = useCallback(
    (image?: HTMLImageElement) => {
      const img = image || originalImage;
      const canvas = canvasRef.current;
      if (!img || !canvas) return;

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // CSS 필터 적용
      ctx.filter = `brightness(${brightness}) contrast(${contrast}) saturate(${saturation})`;
      ctx.drawImage(img, 0, 0);

      // 결과를 데이터 URL로 변환
      const dataUrl = canvas.toDataURL('image/webp', 0.9);
      setImgDataUrl(dataUrl);
    },
    [originalImage, brightness, contrast, saturation]
  );

  // 파일 선택 트리거
  function triggerFileSelect() {
    fileInputRef.current?.click();
  }

  // 이미지 다운로드
  function downloadImage() {
    if (!imgDataUrl) return;
    const a = document.createElement('a');
    a.href = imgDataUrl;
    a.download = `se-kai-photo-${Date.now()}.webp`;
    a.click();
  }

  // 앨범에 저장 (Web Share API 또는 다운로드)
  async function saveToAlbum() {
    if (!imgDataUrl) return;

    try {
      // Web Share API 지원 확인
      if (navigator.share && navigator.canShare) {
        // DataURL을 Blob으로 변환
        const response = await fetch(imgDataUrl);
        const blob = await response.blob();
        const file = new File([blob], `se-kai-photo-${Date.now()}.webp`, {
          type: 'image/webp',
        });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'Se-kai Photo',
            text: 'Se-kai로 편집한 사진',
            files: [file],
          });
          return;
        }
      }

      // Web Share API가 지원되지 않으면 다운로드
      downloadImage();
    } catch (error) {
      console.error('앨범 저장 실패:', error);
      // 실패 시 다운로드로 대체
      downloadImage();
    }
  }

  // 필터 리셋
  function resetFilters() {
    setBrightness(1);
    setContrast(1);
    setSaturation(1);
    if (originalImage) {
      applyFilters(originalImage);
    }
  }

  // 필터 값이 변경될 때마다 자동으로 적용
  useEffect(() => {
    if (originalImage) {
      applyFilters();
    }
  }, [applyFilters, originalImage]);

  return (
    <Box
      style={{
        width: '100%',
        maxWidth: '600px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}
    >
      <Heading
        size="5"
        mb="4"
        style={{
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
          textAlign: 'center',
        }}
      >
        📷 Se-kai Photo Editor
      </Heading>

      {error && (
        <Box
          mb="4"
          p="3"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '8px',
          }}
        >
          <Text
            size="2"
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              display: 'block',
            }}
          >
            {error}
          </Text>
        </Box>
      )}

      <Flex direction="column" gap="4">
        {/* 숨겨진 파일 입력 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {/* 사진 선택 버튼 */}
        {!imgDataUrl && (
          <Button
            size="4"
            color="teal"
            onClick={triggerFileSelect}
            style={{
              height: '120px',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <ImageIcon width="32" height="32" />
            <Text size="3">사진 선택 또는 촬영</Text>
            <Text size="1" style={{ opacity: 0.8 }}>
              갤러리에서 선택하거나 카메라로 촬영
            </Text>
          </Button>
        )}

        {/* 편집된 이미지 미리보기 */}
        {imgDataUrl && (
          <Box>
            <Text
              size="3"
              mb="3"
              style={{
                color: 'white',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                display: 'block',
                textAlign: 'center',
              }}
            >
              편집 결과
            </Text>
            <Box
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <img
                src={imgDataUrl}
                alt="편집된 사진"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  display: 'block',
                }}
              />
            </Box>
          </Box>
        )}

        {/* 필터 조절 */}
        {originalImage && (
          <Box>
            <Text
              size="3"
              mb="3"
              style={{
                color: 'white',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                display: 'block',
                textAlign: 'center',
              }}
            >
              필터 조절
            </Text>

            <Flex direction="column" gap="3">
              {/* 밝기 */}
              <Box>
                <Text
                  size="2"
                  mb="2"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    display: 'block',
                  }}
                >
                  밝기: {brightness.toFixed(2)}
                </Text>
                <Slider
                  value={[brightness]}
                  onValueChange={(value) => setBrightness(value[0])}
                  min={0.5}
                  max={2}
                  step={0.05}
                  color="teal"
                />
              </Box>

              {/* 대비 */}
              <Box>
                <Text
                  size="2"
                  mb="2"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    display: 'block',
                  }}
                >
                  대비: {contrast.toFixed(2)}
                </Text>
                <Slider
                  value={[contrast]}
                  onValueChange={(value) => setContrast(value[0])}
                  min={0.5}
                  max={2}
                  step={0.05}
                  color="teal"
                />
              </Box>

              {/* 채도 */}
              <Box>
                <Text
                  size="2"
                  mb="2"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    display: 'block',
                  }}
                >
                  채도: {saturation.toFixed(2)}
                </Text>
                <Slider
                  value={[saturation]}
                  onValueChange={(value) => setSaturation(value[0])}
                  min={0}
                  max={2}
                  step={0.05}
                  color="teal"
                />
              </Box>

              {/* 필터 리셋 */}
              <Button size="2" variant="soft" onClick={resetFilters} style={{ alignSelf: 'center' }}>
                <ResetIcon width="14" height="14" />
                필터 초기화
              </Button>
            </Flex>
          </Box>
        )}

        {/* 액션 버튼 */}
        {imgDataUrl && (
          <Flex gap="2" justify="center" wrap="wrap">
            <Button size="3" color="teal" onClick={saveToAlbum}>
              <Share1Icon width="16" height="16" />
              앨범에 저장
            </Button>
            <Button size="3" variant="soft" onClick={downloadImage}>
              <DownloadIcon width="16" height="16" />
              다운로드
            </Button>
            <Button size="3" variant="outline" onClick={triggerFileSelect}>
              <ImageIcon width="16" height="16" />
              다른 사진 선택
            </Button>
          </Flex>
        )}
      </Flex>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </Box>
  );
}
