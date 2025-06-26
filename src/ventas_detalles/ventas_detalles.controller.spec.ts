import { Test, TestingModule } from '@nestjs/testing';
import { VentasDetallesController } from './ventas_detalles.controller';
import { VentasDetallesService } from './ventas_detalles.service';

describe('VentasDetallesController', () => {
  let controller: VentasDetallesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VentasDetallesController],
      providers: [VentasDetallesService],
    }).compile();

    controller = module.get<VentasDetallesController>(VentasDetallesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
