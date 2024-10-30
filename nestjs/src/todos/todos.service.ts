import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

const expressdomain = 'http://localhost:3000';
const expresstodos = expressdomain + '/todos';

@Injectable()
export class TodosService {
  async create(createTodoDto: CreateTodoDto) {
    let res;
    try {
      res = await fetch(expresstodos, {
        method: 'POST',
        body: JSON.stringify(createTodoDto),
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      throw new ServiceUnavailableException();
    }

    const data = res.ok ? res.json() : null;
    return data;
  }

  async findAll() {
    let res;
    try {
      res = await fetch(expresstodos);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      throw new ServiceUnavailableException();
    }

    const data = res.ok ? res.json() : null;
    return data;
  }

  async findOne(id: number) {
    let res;
    try {
      res = await fetch(`${expresstodos}/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      throw new ServiceUnavailableException();
    }

    const data = res.ok ? res.json() : null;
    return data;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    let res;
    try {
      res = await fetch(`${expresstodos}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updateTodoDto),
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      throw new ServiceUnavailableException();
    }

    const data = res.ok ? res.json() : null;
    return data;
  }

  async remove(id: number) {
    let res;
    try {
      res = await fetch(`${expresstodos}/${id}`, {
        method: 'DELETE',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      throw new ServiceUnavailableException();
    }

    const data = res.ok ? res.json() : null;
    return data;
  }
}
