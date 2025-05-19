import { Form, Input, InputNumber, Modal, Select, Switch, message, Divider, Row, Col } from "antd";
import { useEffect, useState } from "react";
import PlacePicker from "@/components/common/PlacePicker";
import { useCreateAffiliate, useUpdateAffiliate } from "../../../hooks/useQueryHooks";

const { TextArea } = Input;
const { Option } = Select;

const AffiliateFormModal = ({ visible, onCancel, affiliate, onSuccess }) => {
  const [form] = Form.useForm();
  const createAffiliateMutation = useCreateAffiliate();
  const updateAffiliateMutation = useUpdateAffiliate();

  const [showServicePricing, setShowServicePricing] = useState(false);

  useEffect(() => {
    if (affiliate) {
      form.setFieldsValue({
        name: affiliate.name,
        code: affiliate.code,
        description: affiliate.description,
        companyName: affiliate.companyName,
        companyEmail: affiliate.companyEmail,
        commissionPercentage: affiliate.commissionPercentage,
        isActive: affiliate.isActive,
        trackingUrl: affiliate.trackingUrl,
        redirectPath: affiliate.redirectPath,
        preferredService: affiliate.preferredService,
        servicePricing: affiliate.servicePricing || {
          minPassengers: 0,
        },
        defaultPickupLocation: affiliate.defaultPickupLocation,
        defaultDropoffLocation: affiliate.defaultDropoffLocation,
      });

      setShowServicePricing(!!affiliate.preferredService);
    }
  }, [affiliate, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Clean up location data
      if (values.defaultPickupLocation && !values.defaultPickupLocation.address) {
        values.defaultPickupLocation = null;
      }
      
      if (values.defaultDropoffLocation && !values.defaultDropoffLocation.address) {
        values.defaultDropoffLocation = null;
      }
      
      // If no pricing data is set, remove it
      if (!showServicePricing || !values.preferredService) {
        delete values.servicePricing;
      }
      
      if (affiliate) {
        await updateAffiliateMutation.mutateAsync({
          affiliateId: affiliate.id || affiliate._id,
          data: values,
        });
      } else {
        await createAffiliateMutation.mutateAsync(values);
      }
      
      onSuccess();
      form.resetFields();
    } catch (error) {
      if (error.errorFields) {
        // Form validation error
        const firstError = error.errorFields[0];
        message.error(firstError.errors[0]);
      } else {
        // API error
        console.error("Error saving affiliate:", error);
      }
    }
  };

  const handleServiceChange = (value) => {
    setShowServicePricing(!!value);
  };

  return (
    <Modal
      title={affiliate ? "Edit Affiliate" : "Add Affiliate"}
      visible={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      width={900}
      confirmLoading={createAffiliateMutation.isLoading || updateAffiliateMutation.isLoading}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          isActive: true,
          commissionPercentage: 10,
          redirectPath: "/booking-time",
          servicePricing: {
            minPassengers: 0,
          },
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Affiliate Name"
              rules={[{ required: true, message: "Please enter the affiliate name" }]}
            >
              <Input placeholder="Enter affiliate name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="code"
              label="Affiliate Code"
              rules={[
                { required: true, message: "Please enter the affiliate code" },
                { pattern: /^[A-Z0-9]+$/, message: "Code must be uppercase letters and numbers only" },
              ]}
            >
              <Input placeholder="Enter unique code (e.g., PCH)" style={{ textTransform: "uppercase" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="description"
          label="Description"
        >
          <TextArea rows={3} placeholder="Enter description (optional)" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="companyName"
              label="Company Name"
            >
              <Input placeholder="Enter company name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="companyEmail"
              label="Company Email"
              rules={[{ type: "email", message: "Please enter a valid email" }]}
            >
              <Input placeholder="Enter company email" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="commissionPercentage"
              label="Commission Percentage"
              rules={[{ required: true, message: "Please enter commission percentage" }]}
            >
              <InputNumber
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="isActive"
              label="Active"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
        </Row>

        <Divider>Service Configuration</Divider>

        <Form.Item
          name="preferredService"
          label="Default Service Type"
        >
          <Select 
            placeholder="Select preferred service type"
            onChange={handleServiceChange}
          >
            <Option value="from-airport">From Airport</Option>
            <Option value="to-airport">To Airport</Option>
            <Option value="hourly">Hourly</Option>
            <Option value="one-way">One Way</Option>
            <Option value="per-person">Per Person</Option>
            <Option value="canyons">Canyons</Option>
            <Option value="round-trip">Round Trip</Option>
            <Option value="group">Group</Option>
          </Select>
        </Form.Item>

        {showServicePricing && (
          <>
            <Divider>Service Pricing Customization</Divider>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name={["servicePricing", "basePrice"]}
                  label="Custom Base Price"
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    min={0}
                    placeholder="Enter custom price (leave empty for default)"
                    addonBefore="$"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name={["servicePricing", "minPassengers"]}
                  label="Minimum Passengers"
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    min={0}
                    placeholder="Enter minimum passengers (0 for no minimum)"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name={["servicePricing", "customDescription"]}
              label="Custom Service Description"
            >
              <TextArea 
                rows={2} 
                placeholder="Enter custom description (e.g., '$65 per person')" 
              />
            </Form.Item>
          </>
        )}

        <Divider>Default Locations</Divider>

        <Form.Item
          name="defaultPickupLocation"
          label="Default Pickup Location"
        >
          <PlacePicker
            type="pickup"
            placeholder="Enter default pickup location"
          />
        </Form.Item>

        <Form.Item
          name="defaultDropoffLocation"
          label="Default Dropoff Location"
        >
          <PlacePicker
            type="dropoff"
            placeholder="Enter default dropoff location"
          />
        </Form.Item>

        <Divider></Divider>

        <Form.Item
          name="redirectPath"
          label="Redirect Path"
          rules={[{ required: true, message: "Please enter redirect path" }]}
        >
          <Input placeholder="Enter redirect path (e.g., /booking-time)" />
        </Form.Item>

        <Form.Item
          name="trackingUrl"
          label="External Tracking URL"
          rules={[{ type: "url", message: "Please enter a valid URL" }]}
        >
          <Input placeholder="Enter external tracking URL (optional)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AffiliateFormModal;