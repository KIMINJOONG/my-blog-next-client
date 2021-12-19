import { useRouter } from "next/router";
import AppLayout from "../../components/AppLayout";

const Board = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <AppLayout>
            <div
                style={{
                    display: "flex",
                    flex: 1,
                    borderWidth: 1,
                    width: 300,
                    height: 100,
                    borderColor: "red",
                }}
            ></div>
        </AppLayout>
    );
};

export default Board;
