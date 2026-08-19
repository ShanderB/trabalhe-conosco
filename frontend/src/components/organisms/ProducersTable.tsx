import { EnvironmentOutlined, PlusOutlined } from '@ant-design/icons';
import { Alert, Button, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { DocumentBadge } from '../atoms/DocumentBadge';
import { ConfirmDeleteAction } from '../molecules/ConfirmDeleteAction';
import { useDeleteProducerMutation, useListProducersQuery } from '../../features/producers/producersApi';
import type { Producer } from '../../types/domain';

interface ProducersTableProps {
  onCreate: () => void;
  onEdit: (producer: Producer) => void;
}

export function ProducersTable({ onCreate, onEdit }: ProducersTableProps) {
  const { data, isLoading, isFetching, isError, error } = useListProducersQuery();
  const [deleteProducer, { isLoading: isDeleting }] = useDeleteProducerMutation();

  const columns: ColumnsType<Producer> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Documento',
      dataIndex: 'document',
      key: 'document',
      render: (document: string) => <DocumentBadge document={document} />,
    },
    {
      title: 'Ações',
      key: 'actions',
      width: 280,
      render: (_, producer) => (
        <>
          <Link to={`/producers/${producer.id}/farms`}>
            <Button type="link" icon={<EnvironmentOutlined />}>
              Fazendas
            </Button>
          </Link>
          <Button type="link" onClick={() => onEdit(producer)}>
            Editar
          </Button>
          <ConfirmDeleteAction
            title={`Excluir o produtor "${producer.name}"? As fazendas vinculadas também podem ser afetadas.`}
            onConfirm={() => deleteProducer(producer.id)}
            loading={isDeleting}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
          Novo produtor
        </Button>
      </div>
      {isError && (
        <Alert
          type="error"
          showIcon
          message="Não foi possível carregar os produtores."
          description={'status' in (error ?? {}) ? JSON.stringify(error) : undefined}
          style={{ marginBottom: 16 }}
        />
      )}
      <Table<Producer>
        rowKey="id"
        loading={isLoading || isFetching}
        dataSource={data}
        columns={columns}
        locale={{
          emptyText: isError ? 'Erro ao carregar produtores' : 'Nenhum produtor cadastrado ainda',
        }}
        pagination={{ pageSize: 10, hideOnSinglePage: true }}
      />
      {data && data.length === 0 && !isError && (
        <Typography.Paragraph type="secondary" style={{ marginTop: 8 }}>
          Clique em "Novo produtor" para cadastrar o primeiro produtor rural.
        </Typography.Paragraph>
      )}
    </div>
  );
}
