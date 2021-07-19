import { render, screen } from "@testing-library/react";
import React from "react";
import Home, {getStaticProps} from "../../pages";
import {stripe} from '../../services/stripe';
import {mocked} from 'ts-jest/utils';

jest.mock('next/router')
jest.mock('next-auth/client', () => ({
    useSession: () => [null, false]
}));
jest.mock('../../services/stripe');


describe('Home page', () => {
    it('renders correctly', () => {


        render(<Home product={{ priceId: 'fake-price-id', ammount: 'R$10,00' }} />)
    
        expect(screen.getByText('for R$10,00 month')).toBeInTheDocument()
    })

    // it('loads initial data', async () => {
    //     const retrievePricesStripeMocked = mocked(stripe.prices.retrieve);

    //     retrievePricesStripeMocked.mockResolvedValueOnce({
    //         id: 'fake-price-id',
    //         unit_amount: 1000,
    //     } as any);

    //     const response = await getStaticProps({});
        
    //     console.log(response);

    //     expect(response).toEqual(
    //         expect.objectContaining({
    //             props: {
    //                 prodcut: {
    //                     priceId: 'fake-price-id',
    //                     ammount: '$10.00'
    //                 }
    //             }
    //         })
    //     )
    // })
})