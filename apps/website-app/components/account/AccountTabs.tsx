import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAccount } from '@/context/AccountContext';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { useCart } from '@/context/CartContext';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

const Spinner = () => (
    <div className="flex items-center justify-center h-12 w-12 border-4 border-t-[rgb(1,15,28)] border-gray-300 rounded-full animate-spin"></div>
);

const BagIcon = () => (
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="rgb(1, 15, 28)"
        className="w-6 h-6 mr-2"
    >
        <path d="M3.696 7L2.01 21.325C1.961 21.75 2.095 22.177 2.38 22.497C2.664 22.816 3.072 23 3.5 23H20.002C20.43 23 20.839 22.816 21.123 22.497C21.407 22.177 21.542 21.75 21.492 21.324L19.806 7H3.696V7ZM6.751 6V5C6.751 2.243 8.994 0 11.751 0C14.508 0 16.751 2.243 16.751 5V6H20.251C20.505 6 20.718 6.19 20.748 6.441L22.485 21.208C22.568 21.917 22.344 22.628 21.87 23.162C21.396 23.694 20.715 24 20.002 24H3.5C2.787 24 2.106 23.694 1.633 23.162C1.158 22.628 0.934001 21.917 1.017 21.208L2.755 6.441C2.784 6.19 2.998 6 3.251 6H6.751V6ZM7.751 6H15.751V5C15.751 2.794 13.957 1 11.751 1C9.545 1 7.751 2.794 7.751 5V6V6Z" stroke="none"></path>
    </svg>
);

const AccountTabs: React.FC = () => {
    const router = useRouter();
    const { account, logout } = useAccount();

    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
    const { getOrders } = useCart();

    useEffect(() => {
        setLoading(true);
        getOrders()
            .then((response: any) => {
                setOrders(response.data.data?.items || []);
            })
            .catch((e: any) => {
                console.error('Error fetching orders:', e);
            })
            .finally(() => setLoading(false));
    }, []);

    const toggleDetails = (orderId: string) => {
        setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
    };

    const signOutHandler = async () => {
        const isSucess = await logout();
        if (isSucess) {
            router.push("/");
        };
    };

    const tabs = [
        { label: "Account", path: "/account", value: "account-details" },
        { label: "Order History", path: "/account/order-history", value: "order-history" },
        { label: "Address Book", path: "/account/address-book", value: "address-book" },
    ];

    const renderAccountDetails = () => {
        return <div id="account-details" className="container mt-0 mb-6 shadow-md rounded-lg p-6 bg-white">
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-md shadow-sm grid col-start-1 col-end-3">
                        <h3 className="text-sm font-medium text-gray-600">Email</h3>
                        <p className="text-gray-800 font-semibold">{account?.email}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md shadow-sm">
                        <h3 className="text-sm font-medium text-gray-600">First Name</h3>
                        <p className="text-gray-800 font-semibold">{account?.firstName}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md shadow-sm">
                        <h3 className="text-sm font-medium text-gray-600">Last Name</h3>
                        <p className="text-gray-800 font-semibold">{account?.lastName}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md shadow-sm">
                        <h3 className="text-sm font-medium text-gray-600">Account Confirmed</h3>
                        <p className={`text-sm font-semibold ${account?.confirmed ? 'text-green-600' : 'text-red-600'}`}>
                            {account?.confirmed ? "Yes" : "No"}
                        </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-md shadow-sm">
                        <h3 className="text-sm font-medium text-gray-600">Authentication Mode</h3>
                        <p className="text-gray-800 font-semibold">{account?.authenticationMode}</p>
                    </div>
                    {account?.createdAt && <div className="p-4 bg-gray-50 rounded-md shadow-sm">
                        <h3 className="text-sm font-medium text-gray-600">Created At</h3>
                        <p className="text-gray-800 font-semibold">{new Date(account?.createdAt).toLocaleString()}</p>
                    </div>}
                    {account?.lastModifiedAt && <div className="p-4 bg-gray-50 rounded-md shadow-sm">
                        <h3 className="text-sm font-medium text-gray-600">Last Modified At</h3>
                        <p className="text-gray-800 font-semibold">{new Date(account?.lastModifiedAt).toLocaleString()}</p>
                    </div>}
                </div>
            </div>
        </div>
    }

    const renderOrderBook = () => {
        return <section className="pb-12 w-full">
            <div className="container mx-auto px-4">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Spinner />
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-4 text-[rgb(1,15,28)]">No Orders Found</h3>
                        <p className="text-sm text-gray-500">Browse our products and place an order to see them here.</p>
                    </div>
                ) : (
                    <Table className="w-full shadow rounded-lg border border-gray-200">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="bg-[rgb(1,15,28)] text-white p-4 text-left text-sm font-medium">Order Number</TableHead>
                                <TableHead className="bg-[rgb(1,15,28)] text-white p-4 text-left text-sm font-medium">Date</TableHead>
                                <TableHead className="bg-[rgb(1,15,28)] text-white p-4 text-left text-sm font-medium">Order Value</TableHead>
                                <TableHead className="bg-[rgb(1,15,28)] text-white p-4 text-left text-sm font-medium">Status</TableHead>
                                <TableHead className="bg-[rgb(1,15,28)] text-white p-4 text-left text-sm font-medium">Order Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <React.Fragment key={order.orderId}>
                                    <TableRow className={`bg-white border-b hover:bg-gray-50 ${expandedOrderId === order.orderId ? 'bg-gray-100' : ''}`} style={{ background: expandedOrderId === order.orderId ? "#0000001a" : "" }}>
                                        <TableCell className={`p-4 text-[rgb(1,15,28)] flex items-center text-sm ${expandedOrderId === order.orderId ? "font-medium" : ""}`}>
                                            <BagIcon />
                                            {order.orderNumber}
                                        </TableCell>
                                        <TableCell className="p-4 text-[rgb(1,15,28)] text-sm">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell className="p-4 text-[rgb(1,15,28)] text-sm">${(order.sum.centAmount / 100).toFixed(2)}</TableCell>
                                        <TableCell className="p-4 text-[rgb(1,15,28)] text-sm">
                                            <span
                                                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${order.orderState === 'Open'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {order.orderState}
                                            </span>
                                        </TableCell>
                                        <TableCell className="p-4 text-[rgb(1,15,28)] text-sm">
                                            <button
                                                onClick={() => toggleDetails(order.orderId)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {expandedOrderId === order.orderId ? 'Hide Details' : 'View Details'}
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                    {expandedOrderId === order.orderId && (
                                        <tr className="">
                                            <td colSpan={5} className="pxs-4 bg-gray-50 rounded-lg">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg" style={{ background: "#0000000f" }}>
                                                    <div className="md:col-span-1">
                                                        <h4 className="text-lg font-semibold mb-2">Shipping Address</h4>
                                                        <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                                                        <p>{order.shippingAddress.streetName}</p>
                                                        <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                                        <p>{order.shippingAddress.country}</p>
                                                    </div>
                                                    <div className="md:col-span-1 text-right">
                                                        <h4 className="text-lg font-semibold mb-2">Order Summary</h4>
                                                        <p>Gross Amount: ${(order.taxed.grossAmount.centAmount / 100).toFixed(2)}</p>
                                                        <p>Net Amount: ${(order.taxed.netAmount.centAmount / 100).toFixed(2)}</p>
                                                        <p>Tax: ${(order.taxed.taxAmount.centAmount / 100).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                                <div className="px-4 mb-8 py-4" style={{ background: "#0000000f" }}>
                                                    <h4 className="text-lg font-semibold mb-2">Line Items</h4>
                                                    <table className="w-full text-left border-collapse">
                                                        <thead>
                                                            <tr>
                                                                <th className="border-b p-2">Image</th>
                                                                <th className="border-b p-2">Product</th>
                                                                <th className="border-b p-2">SKU</th>
                                                                <th className="border-b p-2">Quantity</th>
                                                                <th className="border-b p-2">Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {order.lineItems.map((item: any) => (
                                                                <tr key={item.lineItemId} className="hover:bg-gray-100">
                                                                    <td className="p-2">
                                                                        <img src={item.variant.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                                                    </td>
                                                                    <td className="p-2">{item.name}</td>
                                                                    <td className="p-2">{item.variant.sku}</td>
                                                                    <td className="p-2">{item.count}</td>
                                                                    <td className="p-2">${(item.price.centAmount / 100).toFixed(2)}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </section>
    }

    const renderAddressBook = () => {
        return (
            <div id="address-book" className="container mt-0 mb-6 p-6 bg-gray-50 rounded-xl">
                <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
                    {(account?.addresses || []).map((address) => (
                        <div
                            key={address.addressId}
                            className="p-8 bg-white rounded-xl shadow-md flex flex-col items-start w-full mx-auto border border-gray-200"
                        >
                            <div className="mb-4 w-full pb-2 border-b-2 border-gray-300">
                                <h3 className="text-xl font-bold text-gray-700">
                                    {address.isShippingAddress && address.isBillingAddress
                                        ? "Address"
                                        : address.isShippingAddress
                                        ? "Shipping Address"
                                        : address.isBillingAddress
                                        ? "Billing Address"
                                        : "Address"}
                                </h3>
                            </div>
                            <div className="w-full space-y-6">
                                <div className="text-gray-800">
                                    <p className="text-sm font-semibold text-gray-600 uppercase">Street</p>
                                    <p className="text-xl font-medium text-gray-900">{address?.streetNumber}, {address?.streetName}</p>
                                </div>
                                <div className="text-gray-800">
                                    <p className="text-sm font-semibold text-gray-600 uppercase">Postal Code</p>
                                    <p className="text-xl font-medium text-gray-900">{address?.postalCode}</p>
                                </div>
                                <div className="text-gray-800">
                                    <p className="text-sm font-semibold text-gray-600 uppercase">City</p>
                                    <p className="text-xl font-medium text-gray-900">{address?.city}</p>
                                </div>
                                {address?.state && (
                                    <div className="text-gray-800">
                                        <p className="text-sm font-semibold text-gray-600 uppercase">State</p>
                                        <p className="text-xl font-medium text-gray-900">{address?.state}</p>
                                    </div>
                                )}
                                <div className="text-gray-800">
                                    <p className="text-sm font-semibold text-gray-600 uppercase">Country</p>
                                    <p className="text-xl font-medium text-gray-900">{address?.country}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    
    

    return (
        <div className="bg-white container w-full pb-[140px] border-b border-b-[1px] border-[var(--tp-common-grey-border)] mt-8 relative">
            <Tabs defaultValue={"account-details"}>
                <TabsList className="flex justify-center border-b border-gray-200 bg-transparent border-b-[1px] pb-0 h-16">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.path}
                            value={tab.value}
                            className={`px-4 py-2 text-gray-500 hover:text-gray-900 font-medium transition-colors duration-300 border-b-1 data-[state=active]:shadow-none text-[20px] data-[state=active]:text-black
                                }`}
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value}>
                        <div className="pt-[20px] flex justify-center">
                            {tab.value == 'account-details' && renderAccountDetails()}
                            {tab.value == 'order-history' && renderOrderBook()}
                            {tab.value === 'address-book' && renderAddressBook()}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
            <div className='absolute right-[1.25rem] mt-2 mr-4 top-2'>
                <Button onClick={signOutHandler} >Sign out</Button>
            </div>
        </div>

    );
};

export default AccountTabs;
