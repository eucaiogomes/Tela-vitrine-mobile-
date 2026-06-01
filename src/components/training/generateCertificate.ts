import { jsPDF } from 'jspdf';

interface CertificateData {
  studentName: string;
  trailTitle: string;
  date: string;
  hours?: string;
  certId?: string;
}

// Cores da marca
const NAVY: [number, number, number] = [4, 20, 51];
const ORANGE: [number, number, number] = [255, 122, 26];
const GRAY: [number, number, number] = [100, 116, 139];

export function generateCertificate(data: CertificateData) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const W = doc.internal.pageSize.getWidth();   // 297
  const H = doc.internal.pageSize.getHeight();  // 210

  // ── Fundo ──────────────────────────────────────────────
  doc.setFillColor(252, 253, 254);
  doc.rect(0, 0, W, H, 'F');

  // Faixa lateral navy
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, 14, H, 'F');
  doc.setFillColor(...ORANGE);
  doc.rect(14, 0, 3, H, 'F');

  // ── Moldura ────────────────────────────────────────────
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.6);
  doc.rect(24, 12, W - 36, H - 24);
  doc.setDrawColor(...ORANGE);
  doc.setLineWidth(0.3);
  doc.rect(26, 14, W - 40, H - 28);

  const cx = (24 + W) / 2 + 6; // centro da área útil

  // ── Cabeçalho ──────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(...NAVY);
  doc.text('LECTOR', cx, 34, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...ORANGE);
  doc.text('PLATAFORMA DE APRENDIZADO CORPORATIVO', cx, 40, { align: 'center', charSpace: 1 });

  // ── Título ─────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(30);
  doc.setTextColor(...NAVY);
  doc.text('CERTIFICADO', cx, 62, { align: 'center', charSpace: 2 });

  doc.setFontSize(11);
  doc.setTextColor(...GRAY);
  doc.setFont('helvetica', 'normal');
  doc.text('DE CONCLUSÃO', cx, 70, { align: 'center', charSpace: 3 });

  // linha decorativa
  doc.setDrawColor(...ORANGE);
  doc.setLineWidth(0.8);
  doc.line(cx - 22, 76, cx + 22, 76);

  // ── Corpo ──────────────────────────────────────────────
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  doc.text('Certificamos que', cx, 90, { align: 'center' });

  // Nome do aluno
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...NAVY);
  doc.text(data.studentName, cx, 104, { align: 'center' });

  // sublinhado do nome
  const nameWidth = doc.getTextWidth(data.studentName);
  doc.setDrawColor(220, 225, 232);
  doc.setLineWidth(0.4);
  doc.line(cx - nameWidth / 2 - 6, 108, cx + nameWidth / 2 + 6, 108);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  doc.text('concluiu com aproveitamento a trilha de aprendizado', cx, 120, { align: 'center' });

  // Título da trilha
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(...ORANGE);
  const trail = doc.splitTextToSize(data.trailTitle.toUpperCase(), W - 90);
  doc.text(trail, cx, 132, { align: 'center' });

  if (data.hours) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.text(`Carga horária: ${data.hours}`, cx, 144, { align: 'center' });
  }

  // ── Rodapé: data + assinatura ──────────────────────────
  const footY = H - 36;

  // Data (esquerda)
  doc.setDrawColor(...NAVY);
  doc.setLineWidth(0.4);
  doc.line(cx - 80, footY, cx - 30, footY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...NAVY);
  doc.text(data.date, cx - 55, footY + 6, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...GRAY);
  doc.text('DATA DE EMISSÃO', cx - 55, footY + 11, { align: 'center', charSpace: 0.5 });

  // Assinatura (direita)
  doc.setDrawColor(...NAVY);
  doc.line(cx + 30, footY, cx + 80, footY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...NAVY);
  doc.text('Equipe Lector', cx + 55, footY + 6, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...GRAY);
  doc.text('COORDENAÇÃO PEDAGÓGICA', cx + 55, footY + 11, { align: 'center', charSpace: 0.5 });

  // ID do certificado
  if (data.certId) {
    doc.setFontSize(6.5);
    doc.setTextColor(180, 188, 198);
    doc.text(`Código de validação: ${data.certId}`, cx, H - 16, { align: 'center', charSpace: 0.5 });
  }

  // Selo circular (canto)
  doc.setFillColor(...ORANGE);
  doc.circle(W - 40, 40, 11, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('100%', W - 40, 39, { align: 'center' });
  doc.setFontSize(5);
  doc.text('CONCLUÍDO', W - 40, 43, { align: 'center', charSpace: 0.3 });

  // ── Download ───────────────────────────────────────────
  const safeName = data.trailTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  doc.save(`certificado-${safeName}.pdf`);
}
