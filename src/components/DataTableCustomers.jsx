import { useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Pagination,
    Typography,
} from "@mui/material";
import { CustomerContext } from "../contexts/CustomerContext";

const DataTableCustomers = ({ onAddCustomer, onDeleteCustomer }) => {
    const { customers } = useContext(CustomerContext);

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const customerData = useMemo(
        () => (Array.isArray(customers) ? customers : []),
        [customers],
    );

    const pageCount = useMemo(
        () => Math.ceil(customerData.length / itemsPerPage),
        [customerData.length, itemsPerPage],
    );

    const paginatedCustomers = useMemo(
        () =>
            customerData.slice((page - 1) * itemsPerPage, page * itemsPerPage),
        [customerData, page, itemsPerPage],
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <div className="h-full w-full max-lg:overflow-x-scroll">
                <div className="h-full max-lg:w-[58.33rem]">
                    <Card sx={{ backgroundColor: "#f5f5f5" }}>
                        <div className="">
                            <div className="relative flex h-[4.167rem] flex-row items-center p-[2.083rem]">
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Daftar Pelanggan
                                    </Typography>
                                </CardContent>
                                <CardActions className="absolute right-[2.083rem]">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="hanPurple"
                                        onClick={onAddCustomer}
                                    >
                                        Tambah Pelanggan
                                    </Button>
                                </CardActions>
                            </div>
                            <div className="flex px-[0.83rem]">
                                {[
                                    "Nama Pelanggan",
                                    "No. Telepon",
                                    "Alamat",
                                    "Ubah/Hapus",
                                ].map((title) => (
                                    <div className="w-[25%]" key={title}>
                                        <CardContent>
                                            <Typography
                                                variant="body1"
                                                gutterBottom
                                                fontWeight={500}
                                            >
                                                {title}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div data-testid="customer-table">
                            {paginatedCustomers.length > 0 ? (
                                paginatedCustomers.map((customer) => (
                                    <div
                                        className="flex px-[0.83rem]"
                                        key={customer.id}
                                    >
                                        <div className="w-[25%]">
                                            <CardContent>
                                                <Typography variant="body1">
                                                    {customer.name}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="w-[25%]">
                                            <CardContent>
                                                <Typography variant="body1">
                                                    {customer.phoneNumber}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="w-[25%]">
                                            <CardContent>
                                                <Typography variant="body1">
                                                    {customer.address}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[25%] items-center justify-center gap-[1rem]">
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="hanPurple"
                                                onClick={() =>
                                                    onAddCustomer(customer)
                                                }
                                            >
                                                Ubah
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="hanPurple"
                                                onClick={() =>
                                                    onDeleteCustomer(
                                                        customer.id,
                                                    )
                                                }
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Typography className="p-4 text-center">
                                    Belum ada pelanggan.
                                </Typography>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
            {customerData.length > itemsPerPage && (
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                    color="hanPurple"
                />
            )}
        </>
    );
};

DataTableCustomers.propTypes = {
    onAddCustomer: PropTypes.func,
    onDeleteCustomer: PropTypes.func.isRequired,
};

export default DataTableCustomers;
