import { Controller,
            Get,
            Param,
            Post,
            Body,
            Patch,
            Delete,
            Query,
            NotFoundException
     } from '@nestjs/common';
import { CoffeesService } from './coffees.service';     
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
@Controller('coffees')
export class CoffeesController {
    constructor(private readonly CoffeesService: CoffeesService){}
    @Get()
    findAll(@Query()paginationQuery: PaginationQueryDto) {
        return this.CoffeesService.findAll(paginationQuery);
    }
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.CoffeesService.findOne(id);
    }
    @Post()
    create(@Body() createCoffeeDto:CreateCoffeeDto){
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.CoffeesService.create(createCoffeeDto);
    }
    @Patch(':id')
    update(@Param('id')id:string, @Body() updateCoffeeDto:UpdateCoffeeDto){
        return this.CoffeesService.update(id,updateCoffeeDto) ;
    }
    @Delete(':id')
async remove(@Param('id') id: string) {
    await this.CoffeesService.remove(id);
    return { message: 'Coffee deleted successfully' };
}



}
