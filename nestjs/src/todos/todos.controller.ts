import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const todo = await this.todosService.findOne(+id);
    if (todo == null) {
      throw new NotFoundException();
    }
    return todo;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const todo = await this.todosService.update(+id, updateTodoDto);
    if (todo == null) {
      throw new NotFoundException();
    }
    return todo;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const todo = await this.todosService.remove(+id);
    if (todo == null) {
      throw new NotFoundException();
    }
    return todo;
  }

  @Post('refresh')
  async refresh() {
    const todos = await this.todosService.refresh();
    if (todos == null) {
      throw new ServiceUnavailableException();
    }
    return todos;
  }
}
