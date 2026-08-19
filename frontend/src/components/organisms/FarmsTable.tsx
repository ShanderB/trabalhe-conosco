import { PlusOutlined } from '@ant-design/icons';
import { Alert, Button, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ConfirmDeleteAction } from '../molecules/ConfirmDeleteAction';
import { useDeleteFarmMutation, useListFarmsQuery } from '../../features/farms/farmsApi';
import type { Farm } from '../../types/domain';

interface FarmsTableProps {
  producerId: string;
  onCreate: () => void;
  onEdit: (farm: Farm) => void;
  onManageCrops: (farm: Farm) => void;
}

const hectares = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });

export function FarmsTable({ producerId, onCreate, onEdit, onManageCrops }: FarmsTableProps) {
  const { data, isLoading, isFetching, isError } = useListFarmsQuery();
  const [deleteFarm, { isLoading: isDeleting }] = useDeleteFarmMutation();

  const farms = (data ?? []).filter((farm) => farm.producerId === producerId);

  const columns: ColumnsType<Farm> = [
    { title: 'Fazenda', dataIndex: 'name', key: 'name' },
    {
      title: 'Localização',
      key: 'location',
      render: (_, farm) => (
        <span>
          {farm.city} <Tag>{farm.state}</Tag>
        </span>
      ),
    },
    {
      title: 'Área total (ha)',
      dataIndex: 'totalArea',
      key: 'totalArea',
      align: 'right',
      render: (value: number) => hectares.format(value),
    },
    {
      title: 'Agricultável (ha)',
      dataIndex: 'agricultableArea',
      key: 'agricultableArea',
      align: 'right',
      render: (value: number) => hectares.format(value),
    },
    {
      title: 'Vegetação (ha)',
      dataIndex: 'vegetationArea',
      key: 'vegetationArea',
      align: 'right',
      render: (value: number) => hectares.format(value),
    },
    {
      title: 'Ações',
      key: 'actions',
      width: 260,
      render: (_, farm) => (
        <>
          <Button type="link" onClick={() => onManageCrops(farm)}>
            Culturas
          </Button>
          <Button type="link" onClick={() => onEdit(farm)}>
            Editar
          </Button>
          <ConfirmDeleteAction
            title={`Excluir a fazenda "${farm.name}"?`}
            onConfirm={() => deleteFarm(farm.id)}
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
          Nova fazenda
        </Button>
      </div>
      {isError && (
        <Alert type="error" showIcon message="Não foi possível carregar as fazendas." style={{ marginBottom: 16 }} />
      )}
      <Table<Farm>
        rowKey="id"
        loading={isLoading || isFetching}
        dataSource={farms}
        columns={columns}
        locale={{ emptyText: isError ? 'Erro ao carregar fazendas' : 'Nenhuma fazenda cadastrada para este produtor' }}
        pagination={{ pageSize: 10, hideOnSinglePage: true }}
      />
    </div>
  );
}
