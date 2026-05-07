import { useParams } from '@tanstack/react-router';
import TrainingView from '../components/training/TrainingView';

export default function TrainingPage() {
  const { id } = useParams({ strict: false }) as { id?: string };
  return <TrainingView courseId={id} />;
}
