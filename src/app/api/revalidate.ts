import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if the secret is valid
    if (req.query.secret !== process.env.SANITY_REVALIDATE_SECRET) {
        return res.status(401).json({ message: 'Invalid secret token' });
    }

    try {
        await res.revalidate('/music');
        await res.revalidate('/photo');

        return res.json({ revalidated: true });
    } catch (err) {
        return res.status(500).json({ message: 'Error revalidating' });
    }
}
