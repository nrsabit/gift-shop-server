import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import moment from 'moment';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/salesDB');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define the Sale schema
const saleSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  salePrice: Number,
  createdAt: Date
});

const SaleModel = mongoose.model('Sale', saleSchema);

const app = express();
app.use(express.json());

// Route for getting sales history for a given period
app.get('/sales/:period', async (req: Request, res: Response) => {
  const period = req.params.period;
  let startDate: Date;
  let endDate: Date;

  const currentDate = moment();

  switch (period) {
    case 'daily':
      startDate = currentDate.clone().startOf('day').toDate();
      endDate = currentDate.clone().endOf('day').toDate();
      break;
    case 'weekly':
      startDate = currentDate.clone().startOf('week').toDate();
      endDate = currentDate.clone().endOf('week').toDate();
      break;
    case 'monthly':
      startDate = currentDate.clone().startOf('month').toDate();
      endDate = currentDate.clone().endOf('month').toDate();
      break;
    case 'yearly':
      startDate = currentDate.clone().startOf('year').toDate();
      endDate = currentDate.clone().endOf('year').toDate();
      break;
    default:
      return res.status(400).json({ message: 'Invalid period' });
  }

  try {
    const salesForPeriod = await SaleModel.find({ createdAt: { $gte: startDate, $lte: endDate } });

    // Aggregate pipeline to calculate total items sold and total sale value
    const aggregationPipeline = [
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
          _id: null,
          totalItemsSold: { $sum: '$quantity' },
          totalSaleValue: { $sum: '$salePrice' }
        }
      }
    ];

    const aggregatedResults = await SaleModel.aggregate(aggregationPipeline);

    const totalItemsSold = aggregatedResults[0]?.totalItemsSold || 0;
    const totalSaleValue = aggregatedResults[0]?.totalSaleValue || 0;

    // Sort sold items by quantity, high to low
    const soldItemsSorted = [...salesForPeriod].sort((a, b) => b.quantity - a.quantity);

    res.json({
      totalItemsSold,
      totalSaleValue,
      soldItemsSorted
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

