import { useEffect } from 'react';
import { Form, Input, InputNumber, Modal, Select, message } from 'antd';
import { isValidFarmArea } from '../../utils/areaValidator';
import { getApiErrorMessage } from '../../utils/apiError';
import { BRAZIL_STATES } from '../../utils/brazilStates';
import { useCreateFarmMutation, useUpdateFarmMutation } from '../../features/farms/farmsApi';
import type { Farm } from '../../types/domain';

interface FarmFormValues {
  name: string;
  city: string;
  state: string;
  totalArea: number;
  agricultableArea: number;
  vegetationArea: number;
}

interface FarmFormModalProps {
  open: boolean;
  producerId: string;
  farm: Farm | null;
  onClose: () => void;
}

const stateOptions = BRAZIL_STATES.map((uf) => ({ label: uf, value: uf }));

export function FarmFormModal({ open, producerId, farm, onClose }: FarmFormModalProps) {
  const [form] = Form.useForm<FarmFormValues>();
  const [createFarm, { isLoading: isCreating }] = useCreateFarmMutation();
  const [updateFarm, { isLoading: isUpdating }] = useUpdateFarmMutation();
  const isEditing = Boolean(farm);

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        name: farm?.name ?? '',
        city: farm?.city ?? '',
        state: farm?.state ?? undefined,
        totalArea: farm?.totalArea ?? 0,
        agricultableArea: farm?.agricultableArea ?? 0,
        vegetationArea: farm?.vegetationArea ?? 0,
      });
    }
  }, [open, farm, form]);

  function validateAreaSum(_rule: unknown, _value: number) {
    const { totalArea, agricultableArea, vegetationArea } = form.getFieldsValue();
    if (
      totalArea === undefined ||
      agricultableArea === undefined ||
      vegetationArea === undefined
    ) {
      return Promise.resolve();
    }
    return isValidFarmArea({ totalArea, agricultableArea, vegetationArea })
      ? Promise.resolve()
      : Promise.reject(
          new Error('A soma da área agricultável com a área de vegetação não pode ser maior que a área total.'),
        );
  }

  async function handleSubmit() {
    const values = await form.validateFields();
    const payload = { producerId, ...values };
    try {
      if (isEditing && farm) {
        await updateFarm({ id: farm.id, data: payload }).unwrap();
        message.success('Fazenda atualizada com sucesso.');
      } else {
        await createFarm(payload).unwrap();
        message.success('Fazenda cadastrada com sucesso.');
      }
      onClose();
    } catch (error) {
      message.error(getApiErrorMessage(error, 'Não foi possível salvar a fazenda. Tente novamente.'));
    }
  }

  return (
    <Modal
      title={isEditing ? 'Editar fazenda' : 'Nova fazenda'}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={isEditing ? 'Salvar' : 'Cadastrar'}
      cancelText="Cancelar"
      confirmLoading={isCreating || isUpdating}
      destroyOnClose
      width={560}
    >
      <Form<FarmFormValues> form={form} layout="vertical" name="farm-form">
        <Form.Item label="Nome da fazenda" name="name" rules={[{ required: true, message: 'Informe o nome da fazenda.' }]}>
          <Input placeholder="Ex.: Fazenda Santa Fé" />
        </Form.Item>
        <div style={{ display: 'flex', gap: 12 }}>
          <Form.Item
            label="Cidade"
            name="city"
            style={{ flex: 2 }}
            rules={[{ required: true, message: 'Informe a cidade.' }]}
          >
            <Input placeholder="Cidade" />
          </Form.Item>
          <Form.Item
            label="UF"
            name="state"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Selecione a UF.' }]}
          >
            <Select options={stateOptions} placeholder="UF" showSearch />
          </Form.Item>
        </div>
        <Form.Item
          label="Área total (ha)"
          name="totalArea"
          dependencies={['agricultableArea', 'vegetationArea']}
          rules={[
            { required: true, message: 'Informe a área total.' },
            {
              validator: (_rule, value: number) =>
                value > 0
                  ? Promise.resolve()
                  : Promise.reject(new Error('A área total deve ser maior que zero.')),
            },
            { validator: validateAreaSum },
          ]}
        >
          <InputNumber<number> style={{ width: '100%' }} min={0} placeholder="0" />
        </Form.Item>
        <div style={{ display: 'flex', gap: 12 }}>
          <Form.Item
            label="Área agricultável (ha)"
            name="agricultableArea"
            style={{ flex: 1 }}
            dependencies={['totalArea', 'vegetationArea']}
            rules={[
              { required: true, message: 'Informe a área agricultável.' },
              { type: 'number', min: 0, message: 'Deve ser maior ou igual a 0.' },
              { validator: validateAreaSum },
            ]}
          >
            <InputNumber<number> style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
          <Form.Item
            label="Área de vegetação (ha)"
            name="vegetationArea"
            style={{ flex: 1 }}
            dependencies={['totalArea', 'agricultableArea']}
            rules={[
              { required: true, message: 'Informe a área de vegetação.' },
              { type: 'number', min: 0, message: 'Deve ser maior ou igual a 0.' },
              { validator: validateAreaSum },
            ]}
          >
            <InputNumber<number> style={{ width: '100%' }} min={0} placeholder="0" />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
