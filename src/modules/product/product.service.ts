import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
      },
    });
  }

  async getProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async getProductById(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
    if (!product) throw new NotFoundException();

    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    await this.getProductById(id);
    return await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        price: updateProductDto.price,
      },
    });
  }

  async removeProduct(id: number) {
    await this.getProductById(id);
    return this.prisma.product.deleteMany({
      where: {
        id,
      },
    });
  }
}
