
import { render, screen, fireEvent } from '@testing-library/react';
import {mocked} from 'ts-jest/utils'
import { SubscribeButton } from '.';
import { signin, useSession } from 'next-auth/client';
import { NextRouter, useRouter } from 'next/router';

jest.mock('next-auth/client')

jest.mock('next/router')

describe('SubscribeButton component', () => {
    it('renders correctly', () => {
        mocked(useSession).mockReturnValueOnce([null, false]);

        render(
            <SubscribeButton />
        );
    
        expect(screen.getByText('Subscribe now')).toBeInTheDocument();
    })

    it('redirects user to sign in when not authenticated', () => {
        mocked(useSession).mockReturnValueOnce([null, false]);
        
        render(<SubscribeButton />);

        const subscribeButton = screen.getByText('Subscribe now');

        fireEvent.click(subscribeButton);

        expect(signin).toHaveBeenCalled();
    });

    // it('redirects to posts when user already has a subscription', () => {
    //     const useRouterMocked = mocked(useRouter);
    //     mocked(useSession).mockReturnValueOnce([{ user: { name: 'John Doe', email: 'john.doe@example.com', activeSubscription: 'fake-sub' }, expires: 'fake-expire' }, false]);

    //     const pushMock = jest.fn();

    //     useRouterMocked.mockReturnValueOnce({
    //         push: pushMock
    //     } as any)
        
    //     render(<SubscribeButton/>);

    //     const subscribeButton = screen.getByText('Subscribe now');

    //     fireEvent.click(subscribeButton);

    //     expect(pushMock).toHaveBeenCalled();
    // })

})

