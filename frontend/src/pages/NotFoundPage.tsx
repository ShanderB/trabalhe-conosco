import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Página não encontrada."
      extra={
        <Link to="/producers">
          <Button type="primary">Voltar para produtores</Button>
        </Link>
      }
    />
  );
}
