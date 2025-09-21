import { generateMySEO } from '@/utils/about';
import { MyPage } from './data';

export async function generateMetadata() {
  return await generateMySEO();
}

export default function Page() {
  return <MyPage />;
}
