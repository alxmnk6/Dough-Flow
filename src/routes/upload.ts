import { Router, Request, Response } from 'express';
import multer, { Multer } from 'multer';
import fs from 'fs/promises';
import pdf from 'pdf-parse';
import Transaction from '../models/Transaction';

const router = Router();
const upload: Multer = multer({ dest: 'uploads/' });

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

router.post('/pdf', upload.single('file'), async (req: MulterRequest, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Read the uploaded PDF file
        const dataBuffer = await fs.readFile(req.file.path);
        
        // Parse PDF content
        const data = await pdf(dataBuffer);
        
        // Extract text content
        const text = data.text;
        
        // Implement parsing logic here
        const transactions = parseTransactions(text);

        // Save transactions to MongoDB
        await Transaction.insertMany(transactions);

        // Clean up: delete the uploaded file
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
    // Implement your parsing logic here
    // Example: Split text by lines and extract transaction details
    const lines = text.split('\n');
    const transactions = lines.map(line => {
        // Example parsing logic
        const [date, description, amount] = line.split(' ');
        return {
            date: new Date(date),
            description,
            amount: parseFloat(amount),
            category: "Uncategorized",
            userId: "test-user"
        };
    });
    return transactions;
}

export default router; 