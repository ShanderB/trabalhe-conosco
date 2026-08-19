import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';

interface ConfirmDeleteActionProps {
  title: string;
  onConfirm: () => void;
  loading?: boolean;
  label?: string;
}

export function ConfirmDeleteAction({ title, onConfirm, loading, label = 'Excluir' }: ConfirmDeleteActionProps) {
  return (
    <Popconfirm title={title} okText="Excluir" cancelText="Cancelar" okButtonProps={{ danger: true }} onConfirm={onConfirm}>
      <Button danger type="link" icon={<DeleteOutlined />} loading={loading}>
        {label}
      </Button>
    </Popconfirm>
  );
}
