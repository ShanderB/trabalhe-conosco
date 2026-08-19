import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { db, resetDb } from '../../mocks/data';
import { server } from '../../mocks/server';
import { renderWithProviders } from '../../test/renderWithProviders';
import { ProducersTable } from './ProducersTable';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
  server.resetHandlers();
  resetDb();
});
afterAll(() => server.close());

describe('ProducersTable', () => {
  it('renderiza os produtores retornados pela API mockada (MSW)', async () => {
    renderWithProviders(<ProducersTable onCreate={jest.fn()} onEdit={jest.fn()} />);

    expect(await screen.findByText('João da Silva')).toBeInTheDocument();
    expect(screen.getByText('Agropecuária Boa Vista Ltda')).toBeInTheDocument();

    expect(screen.getByText('111.444.777-35')).toBeInTheDocument();
  });

  it('mostra estado vazio quando não há produtores cadastrados', async () => {
    db.producers = [];

    renderWithProviders(<ProducersTable onCreate={jest.fn()} onEdit={jest.fn()} />);

    expect(await screen.findByText('Nenhum produtor cadastrado ainda')).toBeInTheDocument();
  });

  it('chama onCreate ao clicar em "Novo produtor"', async () => {
    const onCreate = jest.fn();
    const user = userEvent.setup();
    renderWithProviders(<ProducersTable onCreate={onCreate} onEdit={jest.fn()} />);
    await screen.findByText('João da Silva');

    await user.click(screen.getByRole('button', { name: /novo produtor/i }));

    expect(onCreate).toHaveBeenCalledTimes(1);
  });

  it('chama onEdit com o produtor correto ao clicar em "Editar"', async () => {
    const onEdit = jest.fn();
    const user = userEvent.setup();

    renderWithProviders(<ProducersTable onCreate={jest.fn()} onEdit={onEdit} />);

    const row = await screen.findByText('João da Silva');
    const tableRow = row.closest('tr') as HTMLElement;
    await user.click(within(tableRow).getByRole('button', { name: /editar/i }));

    await waitFor(() => expect(onEdit).toHaveBeenCalledTimes(1));
    expect(onEdit).toHaveBeenCalledWith(expect.objectContaining({ name: 'João da Silva' }));
  });
});
