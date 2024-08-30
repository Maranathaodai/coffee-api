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
    create(@Body() body){
        return this.CoffeesService.create(body);
    }
    @Patch(':id')
    update(@Param('id')id:string, @Body() body){
        return this.CoffeesService.update(id, body);
    }
    @Delete(':id')
    remove(@Param('id')id:string){
        return this.CoffeesService.remove(id);
    }
}
