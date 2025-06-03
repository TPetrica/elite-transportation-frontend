import { Form, Input, InputNumber, Modal, Select, Switch, message, Divider, Row, Col, List, Card, Typography } from "antd";
import { useEffect, useState } from "react";
import PlacePicker from "@/components/common/PlacePicker";
import { useCreateAffiliate, useUpdateAffiliate, useServices } from "../../../hooks/useQueryHooks";

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

const AffiliateFormModal = ({ visible, onCancel, affiliate, onSuccess }) => {
  const [form] = Form.useForm();
  const createAffiliateMutation = useCreateAffiliate();
  const updateAffiliateMutation = useUpdateAffiliate();
  
  // Fetch services from backend
  const { data: servicesData } = useServices();
  const services = servicesData?.results || [];

  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [servicePricingMap, setServicePricingMap] = useState(new Map());

  // Available service types
  const serviceTypes = [
    { value: 'from-airport', label: 'From Airport' },
    { value: 'to-airport', label: 'To Airport' },
    { value: 'hourly', label: 'Hourly' },
    { value: 'one-way', label: 'One Way' },
    { value: 'per-person', label: 'Per Person' },
    { value: 'canyons', label: 'Canyons' },
    { value: 'round-trip', label: 'Round Trip' },
    { value: 'group', label: 'Group' },
  ];

  useEffect(() => {
    if (affiliate) {
      // Set form values
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
        defaultPickupLocation: affiliate.defaultPickupLocation,
        defaultDropoffLocation: affiliate.defaultDropoffLocation,
      });

      // Set service pricing map
      const pricingMap = new Map();
      if (affiliate.servicePricingList && affiliate.servicePricingList.length > 0) {
        affiliate.servicePricingList.forEach(sp => {
          pricingMap.set(sp.serviceType, {
            enabled: true,
            basePrice: sp.basePrice,
            minPassengers: sp.minPassengers || 0,
          });
        });
      } else if (affiliate.servicePricing && affiliate.preferredService) {
        // Convert old single pricing to new format for backward compatibility
        pricingMap.set(affiliate.preferredService, {
          enabled: true,
          basePrice: affiliate.servicePricing.basePrice,
          minPassengers: affiliate.servicePricing.minPassengers || 0,
        });
      }
      setServicePricingMap(pricingMap);
      
      // Select first enabled service if any
      const firstEnabled = Array.from(pricingMap.keys())[0];
      if (firstEnabled) {
        setSelectedServiceType(firstEnabled);
      }
    }
  }, [affiliate, form]);

  const handleServiceToggle = (serviceType, enabled) => {
    const newMap = new Map(servicePricingMap);
    
    if (enabled) {
      // Find the default service to get base values
      const defaultService = services.find(s => s.serviceType === serviceType);
      newMap.set(serviceType, {
        enabled: true,
        basePrice: defaultService?.basePrice || 0,
        minPassengers: defaultService?.minPassengers || 0,
      });
      // Auto-select this service
      setSelectedServiceType(serviceType);
    } else {
      newMap.delete(serviceType);
      // If we're disabling the currently selected service, clear selection
      if (selectedServiceType === serviceType) {
        setSelectedServiceType(null);
      }
    }
    
    setServicePricingMap(newMap);
  };

  const handlePricingChange = (field, value) => {
    if (!selectedServiceType) return;
    
    const newMap = new Map(servicePricingMap);
    const currentPricing = newMap.get(selectedServiceType) || {};
    newMap.set(selectedServiceType, {
      ...currentPricing,
      [field]: value,
    });
    setServicePricingMap(newMap);
  };

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
      
      // Convert pricing map to array
      values.servicePricingList = Array.from(servicePricingMap.entries()).map(([serviceType, pricing]) => ({
        serviceType,
        basePrice: pricing.basePrice,
        minPassengers: pricing.minPassengers,
      }));
      
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
      setServicePricingMap(new Map());
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

  const currentServicePricing = selectedServiceType ? servicePricingMap.get(selectedServiceType) : null;
  const defaultService = selectedServiceType ? services.find(s => s.serviceType === selectedServiceType) : null;

  return (
    <Modal
      title={affiliate ? "Edit Affiliate" : "Add Affiliate"}
      visible={visible}
      onCancel={() => {
        onCancel();
        setServicePricingMap(new Map());
        setSelectedServiceType(null);
      }}
      onOk={handleSubmit}
      width={1200}
      confirmLoading={createAffiliateMutation.isLoading || updateAffiliateMutation.isLoading}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          isActive: true,
          commissionPercentage: 10,
          redirectPath: "/booking-time",
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

        <Divider>Service Configuration and Pricing</Divider>

        <Row gutter={24}>
          <Col span={12}>
            <Title level={5}>Services</Title>
            <List
              size="small"
              dataSource={serviceTypes}
              renderItem={(serviceType) => {
                const isEnabled = servicePricingMap.has(serviceType.value);
                const isSelected = selectedServiceType === serviceType.value;
                const service = services.find(s => s.serviceType === serviceType.value);
                
                return (
                  <List.Item
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#f0f2f5' : 'transparent',
                      borderLeft: isSelected ? '3px solid #1890ff' : '3px solid transparent',
                      marginBottom: '4px',
                    }}
                    onClick={() => isEnabled && setSelectedServiceType(serviceType.value)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                      <div style={{ flex: 1 }}>
                        <Text strong={isSelected}>{serviceType.label}</Text>
                        {service && (
                          <div style={{ fontSize: '12px', color: '#666' }}>
                            Default: ${service.basePrice}
                          </div>
                        )}
                      </div>
                      <Switch
                        checked={isEnabled}
                        onChange={(checked) => handleServiceToggle(serviceType.value, checked)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </List.Item>
                );
              }}
            />
          </Col>
          
          <Col span={12}>
            <Title level={5}>Pricing Configuration</Title>
            {selectedServiceType && currentServicePricing ? (
              <Card>
                <Title level={5} style={{ marginTop: 0 }}>
                  {serviceTypes.find(st => st.value === selectedServiceType)?.label}
                </Title>
                
                {defaultService && (
                  <Text type="secondary" style={{ display: 'block', marginBottom: 16, fontSize: 12 }}>
                    System default: ${defaultService.basePrice} 
                    {defaultService.minPassengers > 0 && ` | Min passengers: ${defaultService.minPassengers}`}
                  </Text>
                )}
                
                <Form.Item label="Base Price" style={{ marginBottom: 16 }}>
                  <InputNumber
                    style={{ width: "100%" }}
                    min={0}
                    value={currentServicePricing.basePrice}
                    onChange={(value) => handlePricingChange('basePrice', value)}
                    addonBefore="$"
                    placeholder="Enter custom price"
                  />
                </Form.Item>
                
                <Form.Item label="Minimum Passengers" style={{ marginBottom: 0 }}>
                  <InputNumber
                    style={{ width: "100%" }}
                    min={0}
                    value={currentServicePricing.minPassengers}
                    onChange={(value) => handlePricingChange('minPassengers', value)}
                    placeholder="Enter minimum passengers"
                  />
                </Form.Item>
              </Card>
            ) : (
              <Card style={{ textAlign: 'center', padding: '40px' }}>
                <Text type="secondary">
                  {servicePricingMap.size === 0 
                    ? "Enable a service to configure pricing" 
                    : "Select a service to configure pricing"}
                </Text>
              </Card>
            )}
          </Col>
        </Row>

        <Divider>Default Service Selection</Divider>

        <Form.Item
          name="preferredService"
          label="Default Service Type (Optional)"
          help="This service will be pre-selected when users visit through the affiliate link"
        >
          <Select 
            placeholder="Select default service type"
            allowClear
          >
            {Array.from(servicePricingMap.entries()).map(([serviceType]) => {
              const serviceTypeInfo = serviceTypes.find(st => st.value === serviceType);
              return (
                <Option key={serviceType} value={serviceType}>
                  {serviceTypeInfo?.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

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