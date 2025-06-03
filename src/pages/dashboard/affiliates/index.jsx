import { CopyOutlined, DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Space, Table, Tag, Typography } from "antd";
import moment from "moment";
import { useState } from "react";
import { useAffiliates, useDeleteAffiliate } from "../../../hooks/useQueryHooks";
import AffiliateFormModal from "./AffiliateFormModal";

const { Title } = Typography;
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
      sorter: true,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (code) => (
        <Tag color="blue" style={{ cursor: "pointer" }} onClick={() => copyToClipboard(code)}>
          {code} <CopyOutlined style={{ marginLeft: 4 }} />
        </Tag>
      ),
    },
    {
      title: "Company",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Commission",
      dataIndex: "commissionPercentage",
      key: "commissionPercentage",
      render: (percentage) => `${percentage}%`,
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
      sorter: true,
    },
    {
      title: "Bookings",
      dataIndex: ["trackingData", "bookings"],
      key: "bookings",
      sorter: true,
    },
    {
      title: "Revenue",
      dataIndex: ["trackingData", "totalRevenue"],
      key: "revenue",
      render: (revenue) => `$${revenue.toFixed(2)}`,
      sorter: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => showDetails(record)}
          >
            Details
          </Button>
          <Button
            type="default"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id || record._id)}
          >
            Delete
          </Button>
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
    <>
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={2}>Affiliates</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingAffiliate(null);
            setIsFormModalVisible(true);
          }}
        >
          Add Affiliate
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search affiliates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={() => refetch()}
          style={{ width: 300 }}
          allowClear
        />
      </div>

      <Table
        columns={columns}
        dataSource={data?.results}
        rowKey={(record) => record.id || record._id}
        loading={isLoading}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: data?.totalResults,
        }}
        onChange={handleTableChange}
      />

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
        title="Affiliate Details"
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
          <div>
            <p><strong>Name:</strong> {selectedAffiliate.name}</p>
            <p><strong>Code:</strong> {selectedAffiliate.code}</p>
            <p><strong>Description:</strong> {selectedAffiliate.description || "N/A"}</p>
            <p><strong>Company:</strong> {selectedAffiliate.companyName || "N/A"}</p>
            <p><strong>Email:</strong> {selectedAffiliate.companyEmail || "N/A"}</p>
            <p><strong>Commission:</strong> {selectedAffiliate.commissionPercentage}%</p>
            <p><strong>Status:</strong> {selectedAffiliate.isActive ? "Active" : "Inactive"}</p>
            <p>
              <strong>Affiliate Link:</strong>{" "}
              <span style={{ wordBreak: "break-all" }}>
                {generateAffiliateLink(selectedAffiliate.code)}
              </span>
              <Button
                type="link"
                icon={<CopyOutlined />}
                onClick={() => copyToClipboard(generateAffiliateLink(selectedAffiliate.code))}
              >
                Copy
              </Button>
            </p>
            <p><strong>Redirect Path:</strong> {selectedAffiliate.redirectPath}</p>
            <p><strong>Preferred Service:</strong> {selectedAffiliate.preferredService || "None"}</p>
            
            {selectedAffiliate.servicePricingList && selectedAffiliate.servicePricingList.length > 0 && (
              <>
                <hr />
                <h4>Service Pricing Configuration</h4>
                {selectedAffiliate.servicePricingList.map((pricing, index) => (
                  <div key={index} style={{ marginBottom: 10 }}>
                    <p style={{ fontWeight: 'bold' }}>{pricing.serviceType}</p>
                    <p>Base Price: ${pricing.basePrice}</p>
                    {pricing.minPassengers > 0 && <p>Min Passengers: {pricing.minPassengers}</p>}
                  </div>
                ))}
              </>
            )}
            
            <hr />
            <h4>Default Locations</h4>
            {selectedAffiliate.defaultPickupLocation?.address && (
              <p><strong>Pickup:</strong> {selectedAffiliate.defaultPickupLocation.address}</p>
            )}
            {selectedAffiliate.defaultDropoffLocation?.address && (
              <p><strong>Dropoff:</strong> {selectedAffiliate.defaultDropoffLocation.address}</p>
            )}
            <hr />
            <h4>Tracking Data</h4>
            <p><strong>Visits:</strong> {selectedAffiliate.trackingData.visits}</p>
            <p><strong>Bookings:</strong> {selectedAffiliate.trackingData.bookings}</p>
            <p><strong>Total Revenue:</strong> ${selectedAffiliate.trackingData.totalRevenue.toFixed(2)}</p>
            <p><strong>Created:</strong> {moment(selectedAffiliate.createdAt).format("MMMM DD, YYYY")}</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Affiliates;