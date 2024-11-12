import { Router, Request, Response } from 'express';
import multer, { Multer } from 'multer';
import fs from 'fs/promises';
import path from 'path';
import pdf from 'pdf-parse';
import Transaction from '../models/Transaction';

const router = Router();

// Create uploads directory
const uploadDir = path.join(process.cwd(), 'uploads');
fs.mkdir(uploadDir, { recursive: true })
  .catch(err => console.error('Error creating uploads directory:', err));

const upload: Multer = multer({ dest: uploadDir });

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

router.post('/pdf', upload.single('file'), async (req: MulterRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const dataBuffer = await fs.readFile(req.file.path);
        const data = await pdf(dataBuffer);
        const text = data.text;
        
        const transactions = parseTransactions(text);
        await Transaction.insertMany(transactions);
        await fs.unlink(req.file.path);

        res.json({ 
            message: 'Statement processed successfully',
            transactionsFound: transactions.length
        });

    } catch (error) {
        console.error('PDF processing error:', error);
        res.status(500).json({ error: 'Error processing PDF file' });
    }
});

function parseTransactions(text: string): any[] {
    const lines = text.split('\n');
    return lines.map(line => {
        const [date, description, amount] = line.split(' ');
        return {
            date: new Date(date),
            description,
            amount: parseFloat(amount),
            category: "Uncategorized",
            userId: "test-user"
        };
    });
}

export default router; 