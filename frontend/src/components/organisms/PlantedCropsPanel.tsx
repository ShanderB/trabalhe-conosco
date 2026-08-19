import { useState } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Empty, Form, Input, InputNumber, List, Select, Space, Tag, message } from 'antd';
import { useCreateHarvestMutation, useListHarvestsQuery } from '../../features/harvests/harvestsApi';
import {
  useCreatePlantedCropMutation,
  useDeletePlantedCropMutation,
  useListPlantedCropsQuery,
} from '../../features/plantedCrops/plantedCropsApi';
import { getApiErrorMessage } from '../../utils/apiError';
import type { Farm } from '../../types/domain';

interface PlantedCropsPanelProps {
  open: boolean;
  farm: Farm | null;
  onClose: () => void;
}

interface CropFormValues {
  harvestId: string;
  cropName: string;
}

export function PlantedCropsPanel({ open, farm, onClose }: PlantedCropsPanelProps) {
  const [form] = Form.useForm<CropFormValues>();
  const [newHarvestYear, setNewHarvestYear] = useState<number | null>(null);

  const { data: crops } = useListPlantedCropsQuery(farm?.id, { skip: !open || !farm });
  const { data: harvests } = useListHarvestsQuery(undefined, { skip: !open });
  const [createCrop, { isLoading: isCreatingCrop }] = useCreatePlantedCropMutation();
  const [deleteCrop] = useDeletePlantedCropMutation();
  const [createHarvest, { isLoading: isCreatingHarvest }] = useCreateHarvestMutation();

  const farmCrops = crops ?? [];
  const harvestById = new Map((harvests ?? []).map((harvest) => [harvest.id, harvest]));

  async function handleAddCrop() {
    if (!farm) return;
    const values = await form.validateFields();
    try {
      await createCrop({ farmId: farm.id, ...values }).unwrap();
      form.resetFields();
      message.success('Cultura adicionada com sucesso.');
    } catch (error) {
      message.error(getApiErrorMessage(error, 'Não foi possível adicionar a cultura.'));
    }
  }

  async function handleCreateHarvest() {
    if (!newHarvestYear) return;
    try {
      const harvest = await createHarvest({ year: newHarvestYear }).unwrap();
      form.setFieldValue('harvestId', harvest.id);
      setNewHarvestYear(null);
      message.success(`Safra ${harvest.year} cadastrada.`);
    } catch (error) {
      message.error(getApiErrorMessage(error, 'Não foi possível cadastrar a safra.'));
    }
  }

  return (
    <Drawer
      title={farm ? `Culturas plantadas — ${farm.name}` : 'Culturas plantadas'}
      open={open}
      onClose={onClose}
      width={420}
      destroyOnClose
    >
      <Form<CropFormValues> form={form} layout="vertical" name="crop-form">
        <Form.Item
          label="Safra"
          name="harvestId"
          rules={[{ required: true, message: 'Selecione a safra.' }]}
        >
          <Select
            placeholder="Selecione a safra"
            options={(harvests ?? []).map((harvest) => ({ label: harvest.year, value: harvest.id }))}
          />
        </Form.Item>
        <Space.Compact style={{ width: '100%', marginBottom: 16 }}>
          <InputNumber
            style={{ width: '60%' }}
            placeholder="Nova safra (ano)"
            value={newHarvestYear}
            min={1900}
            max={2100}
            onChange={(value) => setNewHarvestYear(value)}
          />
          <Button onClick={handleCreateHarvest} loading={isCreatingHarvest} disabled={!newHarvestYear}>
            Cadastrar safra
          </Button>
        </Space.Compact>
        <Form.Item
          label="Cultura"
          name="cropName"
          rules={[{ required: true, message: 'Informe o nome da cultura (ex.: Soja).' }]}
        >
          <Input placeholder="Ex.: Soja, Milho, Café" />
        </Form.Item>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCrop} loading={isCreatingCrop} block>
          Adicionar cultura
        </Button>
      </Form>

      <List
        style={{ marginTop: 24 }}
        header={<strong>Culturas cadastradas</strong>}
        dataSource={farmCrops}
        locale={{ emptyText: <Empty description="Nenhuma cultura cadastrada para esta fazenda" /> }}
        renderItem={(crop) => (
          <List.Item
            actions={[
              <Button
                key="delete"
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteCrop(crop.id)}
              />,
            ]}
          >
            <Space>
              <Tag color="green">{harvestById.get(crop.harvestId)?.year ?? '—'}</Tag>
              {crop.cropName}
            </Space>
          </List.Item>
        )}
      />
    </Drawer>
  );
}
