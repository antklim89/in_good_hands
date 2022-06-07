import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { FC, ImgHTMLAttributes, useCallback, AnchorHTMLAttributes } from 'react';
import ReactMarkdown from 'react-markdown';

import { MarkdownProps } from './Markdown.types';


const Markdown: FC<MarkdownProps> = ({ components, children, ...props }) => {
    const img = useCallback(({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) => (
        <Image
            alt={alt || 'image'}
            height={400}
            objectFit="contain"
            objectPosition="left"
            src={`${process.env.URL || ''}${src}`}
            width={1280}
        />
    ), []);

    const a = useCallback(({ children: anchorChildren, ...anchorProps }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
            {...anchorProps}
            rel="noreferrer"
            target="_blank"
        >
            {anchorChildren}
        </a>
    ), []);

    return (
        <Box sx={{ p: { pb: 4 }, li: { ml: 4 } }}>
            <ReactMarkdown components={{ ...components, img, a }} {...props} >
                {children}
            </ReactMarkdown>
        </Box>
    );
};

export default Markdown;

