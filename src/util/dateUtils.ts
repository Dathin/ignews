import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const toDefaultAppFormat = (date: Date) => {
    format(date, 'dd MM yyyy', {
        locale: ptBR,
    })
}