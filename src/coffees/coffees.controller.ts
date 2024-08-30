import { Controller,
            Get,
            Param,
            Post,
            Body,
            HttpCode,
            HttpStatus,
            Res,
            Patch,
            Delete,
            Query
     } from '@nestjs/common';
import { CoffeesService } from './coffees.service';     
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
@Controller('coffees')
export class CoffeesController {
    constructor(private readonly CoffeesService: CoffeesService){}
    @Get()

    findAll(@Query()paginationQuery) {
       // const {limit , offset} = paginationQuery;
        return this.CoffeesService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.CoffeesService.findOne(id);
    }
    @Post()
    create(@Body() CreateCoffeeDto:CreateCoffeeDto){
        return this.CoffeesService.create(CreateCoffeeDto);
    }
    @Patch(':id')
    update(@Param('id')id:string, @Body() updateCoffeeDto:UpdateCoffeeDto){
        return this.CoffeesService.update(id,updateCoffeeDto) ;
    }
    @Delete(':id')
    remove(@Param('id')id:string){
        return this.CoffeesService.remove(id);
    }
}
