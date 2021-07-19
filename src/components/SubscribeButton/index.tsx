import { signin, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

export function SubscribeButton(){
    const [session] = useSession();
    const router = useRouter();


    async function handleSubscribe(){
        if(!session) {
            signin('github');
            return;
        }

        if (session.activeSubscription){
            router.push('/posts');
            return; 
        }

        try {
            const response = await api.post('/subscribe');

            const { sessionId } = response.data;

            const stripe = await getStripeJs();

            stripe.redirectToCheckout({sessionId});
        } catch(err){
            alert(err.message);
        }
    }

    return (
        <button type="button" onClick={handleSubscribe} className={styles.subscribeButton}>
            Subscribe now
        </button>
    )
}