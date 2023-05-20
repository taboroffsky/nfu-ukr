import useTranslation from "next-translate/useTranslation";
import Admin from '../../components/Admin/Admin';
import Header from '../../components/Header/Header';

export default function Home() {
    const { t } = useTranslation('common');

    return (
        <div>
            <title>NFU UA Admin</title>
            <Header />
            <Admin />
        </div>
    )
}