import { Repository } from 'typeorm';
import { Injectable , Inject} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type User = any;

@Injectable()
export class UserService {

  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) { }

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  async create(data)  {
    return await this.usersRepository.save(data).then(res => res).catch(e => console.log(e));
  }

  findAll() {
    return `This action returns all user`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findOne2(data: number | any): Promise<User | undefined> {
    return await this.usersRepository.findOne(data);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
