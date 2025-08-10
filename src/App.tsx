import { Layout } from '@/shared/ui/Layout';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { HomePage } from '@/pages/HomePage';

function App() {
  return (
    <Layout header={<Header />} footer={<Footer />}>
      <HomePage />
    </Layout>
  );
}

export default App;
