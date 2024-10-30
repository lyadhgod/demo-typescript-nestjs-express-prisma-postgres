import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma.service';
import { Todo } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const expressdomain = 'http://localhost:3000';
const expresstodos = expressdomain + '/todos';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.prisma.todo.create({
      data: {
        userId: 1,
        title: createTodoDto.title,
        completed: false,
      },
    });
  }

  findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  findOne(id: number): Promise<Todo | null> {
    return this.prisma.todo.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo | null> {
    try {
      return await this.prisma.todo.update({
        where: {
          id,
        },
        data: {
          ...updateTodoDto,
          id,
        },
      });
    } catch (err: unknown) {
      if (err instanceof PrismaClientKnownRequestError) {
        return null;
      }
    }
  }

  async remove(id: number): Promise<Todo | null> {
    try {
      return await this.prisma.todo.delete({
        where: {
          id,
        },
      });
    } catch (err: unknown) {
      if (err instanceof PrismaClientKnownRequestError) {
        return null;
      }
    }
  }

  async refresh(): Promise<Todo[] | null> {
    await this.prisma.todo.deleteMany();

    let res: Response;
    try {
      res = await fetch(expresstodos);
      if (!res.ok) {
        return null;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      return null;
    }

    const todos: Todo[] = await res.json();
    await this.prisma.todo.createMany({
      data: todos,
    });

    return this.findAll();
  }
}
