import { useState } from 'react';
import { PageSubtitle, PageTitle } from '../components/atoms/PageTitle';
import { ProducerFormModal } from '../components/organisms/ProducerFormModal';
import { ProducersTable } from '../components/organisms/ProducersTable';
import type { Producer } from '../types/domain';

export function ProducersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProducer, setEditingProducer] = useState<Producer | null>(null);

  function handleCreate() {
    setEditingProducer(null);
    setModalOpen(true);
  }

  function handleEdit(producer: Producer) {
    setEditingProducer(producer);
    setModalOpen(true);
  }

  function handleClose() {
    setModalOpen(false);
    setEditingProducer(null);
  }

  return (
    <div>
      <PageTitle>Produtores rurais</PageTitle>
      <PageSubtitle>Cadastre, edite e remova produtores. Clique em "Fazendas" para gerenciar as propriedades de cada um.</PageSubtitle>
      <ProducersTable onCreate={handleCreate} onEdit={handleEdit} />
      <ProducerFormModal open={modalOpen} producer={editingProducer} onClose={handleClose} />
    </div>
  );
}
