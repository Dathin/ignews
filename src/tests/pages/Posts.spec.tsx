import { render, screen } from "@testing-library/react";
import React from "react";
import { mocked } from "ts-jest/utils";
import Posts, {getStaticProps} from "../../pages/posts";
import {getPrismicClient} from '../../services/prismic';

const posts = [{slug: 'my-new-post', title: 'My New Post', excerpt: 'Post excerpt', updatedAt: 'March, 10'}]


jest.mock('../../services/prismic')

describe('Home page', () => {
    it('renders correctly', () => {
        render(<Posts posts={posts} />)
    
        expect(screen.getByText('My New Post')).toBeInTheDocument();
    })

    // it('loads initial data', async () => {
    //     const getPrismicClientMocked = mocked(getPrismicClient);

    //     getPrismicClientMocked.mockReturnValueOnce({
    //         query: jest.fn().mockResolvedValueOnce({results: [{
    //             uid: 'new post',
    //             data: [{
    //                 title: [
    //                     {type: 'heading', text: 'My new post'}
    //                 ],
    //                 content: {type: 'paragraph', text: 'My new post text'}
    //             }],
    //             last_publication_date: '04-01-2021'
    //         }]})
    //     } as any)

    //     const response = await getStaticProps({});
        
    //     console.log(response);

    //     expect(response).toEqual(
    //         expect.objectContaining({
    //             props: {
    //                 posts: [{
    //                     slug: 'new post',
    //                     title: 'My new post',
    //                     excerpt: 'My new post text',
    //                     updatedAt: '01 de abril de 2021'
    //                 }]
    //             }
    //         })
    //     )
    // })
})