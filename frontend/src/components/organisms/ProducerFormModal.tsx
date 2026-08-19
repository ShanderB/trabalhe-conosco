import { useEffect } from 'react';
import { Form, Input, Modal, message } from 'antd';
import { formatDocument, isValidDocument, maskDocumentInput } from '../../utils/documentValidator';
import { getApiErrorMessage } from '../../utils/apiError';
import {
  useCreateProducerMutation,
  useUpdateProducerMutation,
} from '../../features/producers/producersApi';
import type { Producer } from '../../types/domain';

interface ProducerFormValues {
  document: string;
  name: string;
}

interface ProducerFormModalProps {
  open: boolean;
  producer: Producer | null;
  onClose: () => void;
}

export function ProducerFormModal({ open, producer, onClose }: ProducerFormModalProps) {
  const [form] = Form.useForm<ProducerFormValues>();
  const [createProducer, { isLoading: isCreating }] = useCreateProducerMutation();
  const [updateProducer, { isLoading: isUpdating }] = useUpdateProducerMutation();
  const isEditing = Boolean(producer);

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        document: producer ? formatDocument(producer.document) : '',
        name: producer?.name ?? '',
      });
    }
  }, [open, producer, form]);

  async function handleSubmit() {
    const values = await form.validateFields();
    try {
      if (isEditing && producer) {
        await updateProducer({ id: producer.id, data: values }).unwrap();
        message.success('Produtor atualizado com sucesso.');
      } else {
        await createProducer(values).unwrap();
        message.success('Produtor cadastrado com sucesso.');
      }
      onClose();
    } catch (error) {
      message.error(getApiErrorMessage(error, 'Não foi possível salvar o produtor. Tente novamente.'));
    }
  }

  return (
    <Modal
      title={isEditing ? 'Editar produtor' : 'Novo produtor'}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={isEditing ? 'Salvar' : 'Cadastrar'}
      cancelText="Cancelar"
      confirmLoading={isCreating || isUpdating}
      destroyOnClose
    >
      <Form<ProducerFormValues> form={form} layout="vertical" name="producer-form">
        <Form.Item
          label="CPF ou CNPJ"
          name="document"
          normalize={(value: string) => maskDocumentInput(value)}
          rules={[
            { required: true, message: 'Informe o CPF ou CNPJ do produtor.' },
            {
              validator: (_rule, value: string) =>
                !value || isValidDocument(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error('CPF/CNPJ inválido.')),
            },
          ]}
        >
          <Input placeholder="000.000.000-00 ou 00.000.000/0000-00" maxLength={18} />
        </Form.Item>
        <Form.Item
          label="Nome"
          name="name"
          rules={[{ required: true, message: 'Informe o nome do produtor ou razão social.' }]}
        >
          <Input placeholder="Nome do produtor" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
