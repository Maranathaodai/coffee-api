import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { Repository } from 'typeorm';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository : Repository<Flavor>
  ) {}

  findAll() {
    return this.coffeeRepository.find({
      relations: ['flavors']
    });
  }
  
  async findOne(id) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: ['flavors'],
    });
    
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    
    return coffee;
  }
  
  async create( createCoffeeDto: CreateCoffeeDto){
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) { 
    const flavors =
    updateCoffeeDto.flavors &&
    (await Promise.all(
      updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
    ));
    
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...UpdateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }
  
  async remove(id: string): Promise<void> {
    const coffee = await this.findOne(id);
    if (!coffee) {
        throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    await this.coffeeRepository.remove(coffee);
}
  private async preloadFlavorByName(name): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({ 
      where: {name},
     });
    if (existingFlavor){
      return existingFlavor;
    }
    return this.flavorRepository.create({ name});
  }

}
