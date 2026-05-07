import { useParams } from '@tanstack/react-router';
import { TrilhaView } from '../components/training/TrilhaView';

export default function TrilhaPage() {
  const { id } = useParams({ strict: false }) as { id?: string };
  return <TrilhaView trailId={id} />;
}
