import { lazy, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import SidebarExtender from "../components/SidebarExtender";
import { CustomerContext } from "../contexts/CustomerContext";
import DataTableCustomers from "../components/DataTableCustomers";
import PageContentWrapper from "../components/PageContentWrapper";

const CustomerModal = lazy(() => import("../modals/CustomerModal"));
const DeleteConfirmationModal = lazy(() => import("../modals/DeleteConfirmationModal"));

const CustomersPage = () => {
    const { deleteCustomer } = useContext(CustomerContext);

    const [modalState, setModalState] = useState({
        show: false,
        product: null,
    });
    const [confirmationModalState, setConfirmationModalState] = useState({
        show: false,
        customerId: null,
    });
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    const handleOpenModal = (customer = null) =>
        setModalState({ show: true, customer });
    const handleCloseModal = () =>
        setModalState({ show: false, customer: null });

    const handleOpenConfirmationModal = (customerId = null) =>
        setConfirmationModalState({ show: true, customerId });

    const handleCloseConfirmationModal = () =>
        setConfirmationModalState({ show: false, customerId: null });

    const handleDeleteConfirm = () => {
        deleteCustomer(confirmationModalState.customerId);
    };

    return (
        <>
            <div
                className="relative flex flex-col"
                style={{
                    filter:
                        modalState.show || confirmationModalState.show
                            ? "blur(5px)"
                            : "none",
                }}
            >
                <TopBar />
                {isDesktop && <Sidebar />}
                <PageContentWrapper>
                    <DataTableCustomers
                        onAddCustomer={handleOpenModal}
                        onDeleteCustomer={handleOpenConfirmationModal}
                    />
                </PageContentWrapper>
                <SidebarExtender />
                <FootBar />
            </div>
            {modalState.show && (
                <>
                    <div
                        className="fixed inset-0 z-10 bg-black opacity-50"
                        onClick={handleCloseModal}
                    ></div>
                    <CustomerModal
                        onClose={handleCloseModal}
                        customer={modalState.customer}
                    />
                </>
            )}
            {confirmationModalState.show && (
                <>
                    <div
                        className="fixed inset-0 z-10 bg-black opacity-50"
                        onClick={handleCloseConfirmationModal}
                    ></div>
                    <DeleteConfirmationModal
                        onClose={handleCloseConfirmationModal}
                        onConfirm={handleDeleteConfirm}
                        entityName="pelanggan"
                    />
                </>
            )}
        </>
    );
};

export default CustomersPage;
