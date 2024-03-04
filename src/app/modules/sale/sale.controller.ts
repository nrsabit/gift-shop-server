import requestHandler from '../../utils/requestHandler';
import responseHandler from '../../utils/responseHandler';
import { SaleServices } from './sale.service';

const createProductcontroller = requestHandler(async (req, res) => {
  const result = await SaleServices.createSaleService(req.body);
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Item Sold Successfully',
    data: result,
  });
});

const saleHistoryController = requestHandler(async (req, res) => {
  const period = req.params.period;
  const result = await SaleServices.getSaleHistory(period);
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Sale History is Retreaved Succeccfully',
    data: result,
  });
});

const getAllSalesController = requestHandler(async (req, res) => {
  const result = await SaleServices.getAllSalesService(req.query);
  responseHandler(res, {
    statusCode: 200,
    success: true,
    message: 'Sale are Retreaved Succeccfully',
    data: result,
  });
});

export const SaleControllers = {
  createProductcontroller,
  saleHistoryController,
  getAllSalesController,
};
