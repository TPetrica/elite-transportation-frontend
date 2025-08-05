import { CopyOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Input, message, Modal, Space, Table, Tag, Tooltip, Typography } from "antd";
import { Copy, Edit, Eye, Link2, PlusCircle, Trash2 } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { useAffiliates, useDeleteAffiliate } from "../../../hooks/useQueryHooks";
import AffiliateFormModal from "./AffiliateFormModal";

const { Search } = Input;

const Affiliates = () => {
  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [editingAffiliate, setEditingAffiliate] = useState(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const { data, isLoading, refetch } = useAffiliates({
    page: pagination.current,
    limit: pagination.pageSize,
    search: searchTerm,
  });

  const deleteAffiliateMutation = useDeleteAffiliate();

  const handleEdit = (affiliate) => {
    setEditingAffiliate(affiliate);
    setIsFormModalVisible(true);
  };

  const handleDelete = (affiliateId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this affiliate?",
      content: "This action cannot be undone.",
      onOk: async () => {
        try {
          await deleteAffiliateMutation.mutateAsync(affiliateId);
          refetch();
        } catch (error) {
          message.error("Failed to delete affiliate");
        }
      },
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    message.success("Copied to clipboard!");
  };

  const generateAffiliateLink = (code) => {
    return `${window.location.origin}/booking-time?affiliate=${code}`;
  };

  const showDetails = (affiliate) => {
    setSelectedAffiliate(affiliate);
    setIsDetailsModalVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <div className="tw-font-medium">{text}</div>
          <div className="tw-text-xs tw-text-gray-500">{record.companyName || 'No company'}</div>
        </div>
      ),
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (code) => (
        <div className="tw-flex tw-items-center tw-gap-2">
          <Tag color="blue">{code}</Tag>
          <Tooltip title="Copy code">
            <Button
              type="text"
              size="small"
              icon={<Copy size={14} />}
              onClick={() => copyToClipboard(code)}
              className="tw-text-gray-500 hover:tw-text-gray-700"
            />
          </Tooltip>
        </div>
      ),
    },
    {
      title: "Commission",
      dataIndex: "commissionPercentage",
      key: "commissionPercentage",
      render: (percentage) => (
        <Tag color="green">{percentage}%</Tag>
      ),
      responsive: ['sm'],
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <Tag color={isActive ? "success" : "default"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Visits",
      dataIndex: ["trackingData", "visits"],
      key: "visits",
      responsive: ['lg'],
      render: (visits) => visits || 0,
    },
    {
      title: "Bookings",
      dataIndex: ["trackingData", "bookings"],
      key: "bookings",
      responsive: ['lg'],
      render: (bookings) => bookings || 0,
    },
    {
      title: "Revenue",
      dataIndex: ["trackingData", "totalRevenue"],
      key: "revenue",
      responsive: ['xl'],
      render: (revenue) => (
        <span className="tw-font-medium tw-text-green-600">
          ${(revenue || 0).toFixed(2)}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="View details">
            <Button
              type="text"
              icon={<Eye size={16} />}
              onClick={() => showDetails(record)}
              className="tw-text-blue-600 hover:tw-text-blue-700"
            />
          </Tooltip>
          <Tooltip title="Edit affiliate">
            <Button
              type="text"
              icon={<Edit size={16} />}
              onClick={() => handleEdit(record)}
              className="tw-text-blue-600 hover:tw-text-blue-700"
            />
          </Tooltip>
          <Tooltip title="Delete affiliate">
            <Button
              type="text"
              icon={<Trash2 size={16} />}
              onClick={() => handleDelete(record.id || record._id)}
              className="tw-text-red-600 hover:tw-text-red-700"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  return (
    <div className="tw-space-y-6">
      <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-start md:tw-items-center tw-gap-4 md:tw-gap-0">
        <div>
          <h1 className="tw-text-xl md:tw-text-2xl tw-font-bold tw-text-gray-900">Affiliates</h1>
          <p className="tw-text-sm tw-text-gray-500">Manage affiliate partners and referral programs</p>
        </div>
        <Button
          type="primary"
          icon={<PlusCircle size={16} className="tw-mr-2" />}
          onClick={() => {
            setEditingAffiliate(null);
            setIsFormModalVisible(true);
          }}
          className="tw-bg-blue-600 hover:tw-bg-blue-700"
        >
          Add Affiliate
        </Button>
      </div>

      <Card className="tw-shadow-sm">
        <div className="tw-mb-6">
          <Search
            placeholder="Search by name, code, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={() => refetch()}
            className="tw-max-w-md"
            allowClear
          />
        </div>

        <div className="tw-overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data?.results}
            rowKey={(record) => record.id || record._id}
            loading={isLoading}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: data?.totalResults,
              showTotal: (total) => `Total ${total} affiliates`,
              showSizeChanger: true,
            }}
            onChange={handleTableChange}
            locale={{
              emptyText: <Empty description="No affiliates found" />,
            }}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </Card>

      <AffiliateFormModal
        visible={isFormModalVisible}
        onCancel={() => {
          setIsFormModalVisible(false);
          setEditingAffiliate(null);
        }}
        affiliate={editingAffiliate}
        onSuccess={() => {
          setIsFormModalVisible(false);
          setEditingAffiliate(null);
          refetch();
        }}
      />

      <Modal
        title={
          <div className="tw-flex tw-items-center tw-justify-between">
            <span className="tw-text-lg tw-font-semibold">{selectedAffiliate?.name}</span>
            <div className="tw-flex tw-items-center tw-gap-2">
              <Tag color="blue">{selectedAffiliate?.code}</Tag>
              <Tag color={selectedAffiliate?.isActive ? "success" : "default"}>
                {selectedAffiliate?.isActive ? "Active" : "Inactive"}
              </Tag>
            </div>
          </div>
        }
        visible={isDetailsModalVisible}
        onCancel={() => setIsDetailsModalVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setIsDetailsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedAffiliate && (
          <div className="tw-space-y-4">
            {/* Basic Information and Performance Metrics */}
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
              <div>
                <h4 className="tw-text-sm tw-font-semibold tw-text-gray-600 tw-mb-2">Basic Information</h4>
                <div className="tw-space-y-2">
                  <div className="tw-flex tw-justify-between">
                    <span className="tw-text-gray-500">Company:</span>
                    <span className="tw-font-medium">{selectedAffiliate.companyName || "N/A"}</span>
                  </div>
                  <div className="tw-flex tw-justify-between">
                    <span className="tw-text-gray-500">Email:</span>
                    <span className="tw-font-medium">{selectedAffiliate.companyEmail || "N/A"}</span>
                  </div>
                  <div className="tw-flex tw-justify-between">
                    <span className="tw-text-gray-500">Commission:</span>
                    <Tag color="green">{selectedAffiliate.commissionPercentage}%</Tag>
                  </div>
                  <div className="tw-flex tw-justify-between">
                    <span className="tw-text-gray-500">Preferred Service:</span>
                    <span className="tw-font-medium tw-capitalize">{selectedAffiliate.preferredService || "None"}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="tw-text-sm tw-font-semibold tw-text-gray-600 tw-mb-2">Performance</h4>
                <div className="tw-space-y-2">
                  <div className="tw-flex tw-justify-between tw-p-2 tw-bg-gray-50 tw-rounded">
                    <span className="tw-text-gray-600">Visits</span>
                    <span className="tw-font-bold tw-text-blue-600">{selectedAffiliate.trackingData.visits}</span>
                  </div>
                  <div className="tw-flex tw-justify-between tw-p-2 tw-bg-gray-50 tw-rounded">
                    <span className="tw-text-gray-600">Bookings</span>
                    <span className="tw-font-bold tw-text-green-600">{selectedAffiliate.trackingData.bookings}</span>
                  </div>
                  <div className="tw-flex tw-justify-between tw-p-2 tw-bg-gray-50 tw-rounded">
                    <span className="tw-text-gray-600">Revenue</span>
                    <span className="tw-font-bold tw-text-green-600">${selectedAffiliate.trackingData.totalRevenue.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Affiliate Link */}
            <div>
              <h4 className="tw-text-sm tw-font-semibold tw-text-gray-600 tw-mb-2">Affiliate Link</h4>
              <div className="tw-flex tw-gap-2">
                <Input
                  value={generateAffiliateLink(selectedAffiliate.code)}
                  readOnly
                  className="tw-flex-1"
                />
                <Button
                  icon={<Copy size={16} />}
                  onClick={() => copyToClipboard(generateAffiliateLink(selectedAffiliate.code))}
                >
                  Copy
                </Button>
              </div>
              <p className="tw-text-xs tw-text-gray-500 tw-mt-1">
                Redirect Path: {selectedAffiliate.redirectPath}
              </p>
            </div>

            {/* Service Pricing Configuration */}
            {selectedAffiliate.servicePricingList && selectedAffiliate.servicePricingList.length > 0 && (
              <div>
                <h4 className="tw-text-sm tw-font-semibold tw-text-gray-600 tw-mb-2">Custom Service Pricing</h4>
                <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-2">
                  {selectedAffiliate.servicePricingList.map((pricing, index) => (
                    <div key={index} className="tw-p-2 tw-bg-gray-50 tw-rounded">
                      <div className="tw-font-medium tw-capitalize tw-text-sm">{pricing.serviceType.replace(/-/g, ' ')}</div>
                      <div className="tw-text-sm tw-text-gray-600">${pricing.basePrice}</div>
                      {pricing.minPassengers > 0 && (
                        <div className="tw-text-xs tw-text-gray-500">Min: {pricing.minPassengers} pax</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Default Locations */}
            {(selectedAffiliate.defaultPickupLocation?.address || selectedAffiliate.defaultDropoffLocation?.address) && (
              <div>
                <h4 className="tw-text-sm tw-font-semibold tw-text-gray-600 tw-mb-2">Default Locations</h4>
                <div className="tw-space-y-1">
                  {selectedAffiliate.defaultPickupLocation?.address && (
                    <div className="tw-text-sm">
                      <span className="tw-text-gray-500">Pickup:</span> {selectedAffiliate.defaultPickupLocation.address}
                    </div>
                  )}
                  {selectedAffiliate.defaultDropoffLocation?.address && (
                    <div className="tw-text-sm">
                      <span className="tw-text-gray-500">Dropoff:</span> {selectedAffiliate.defaultDropoffLocation.address}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description and Created Date */}
            <div className="tw-border-t tw-pt-3">
              {selectedAffiliate.description && (
                <p className="tw-text-sm tw-text-gray-600 tw-mb-2">{selectedAffiliate.description}</p>
              )}
              <p className="tw-text-xs tw-text-gray-500">
                Created: {moment(selectedAffiliate.createdAt).format("MMMM DD, YYYY")}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Affiliates;