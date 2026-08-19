import { useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Alert, Breadcrumb, Skeleton } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { PageSubtitle, PageTitle } from '../components/atoms/PageTitle';
import { DocumentBadge } from '../components/atoms/DocumentBadge';
import { FarmFormModal } from '../components/organisms/FarmFormModal';
import { FarmsTable } from '../components/organisms/FarmsTable';
import { PlantedCropsPanel } from '../components/organisms/PlantedCropsPanel';
import { useGetProducerQuery } from '../features/producers/producersApi';
import type { Farm } from '../types/domain';

export function ProducerFarmsPage() {
  const { id } = useParams<{ id: string }>();
  const producerId = id ?? '';

  const { data: producer, isLoading, isError } = useGetProducerQuery(producerId, { skip: !producerId });

  const [farmModalOpen, setFarmModalOpen] = useState(false);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [cropsFarm, setCropsFarm] = useState<Farm | null>(null);

  function handleCreateFarm() {
    setEditingFarm(null);
    setFarmModalOpen(true);
  }

  function handleEditFarm(farm: Farm) {
    setEditingFarm(farm);
    setFarmModalOpen(true);
  }

  function handleCloseFarmModal() {
    setFarmModalOpen(false);
    setEditingFarm(null);
  }

  if (!producerId) {
    return <Alert type="error" showIcon message="Produtor não informado." />;
  }

  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          { title: <Link to="/producers"><ArrowLeftOutlined /> Produtores</Link> },
          { title: 'Fazendas' },
        ]}
      />

      {isLoading && <Skeleton active paragraph={{ rows: 2 }} />}
      {isError && <Alert type="error" showIcon message="Produtor não encontrado." />}

      {producer && (
        <>
          <PageTitle>Fazendas de {producer.name}</PageTitle>
          <PageSubtitle>
            <DocumentBadge document={producer.document} />
          </PageSubtitle>
          <FarmsTable
            producerId={producer.id}
            onCreate={handleCreateFarm}
            onEdit={handleEditFarm}
            onManageCrops={setCropsFarm}
          />
          <FarmFormModal
            open={farmModalOpen}
            producerId={producer.id}
            farm={editingFarm}
            onClose={handleCloseFarmModal}
          />
          <PlantedCropsPanel open={Boolean(cropsFarm)} farm={cropsFarm} onClose={() => setCropsFarm(null)} />
        </>
      )}
    </div>
  );
}
