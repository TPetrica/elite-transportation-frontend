import { useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AffiliateService from '../../services/affiliate.service';
import { useBooking } from '../../context/BookingContext';

const AffiliateHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAffiliateMode, setPickupDetails, setDropoffDetails, setSelectedService, services } = useBooking();
  
  // Use ref to track if we've already processed this affiliate code
  const processedCodeRef = useRef(null);
  const preferredServiceRef = useRef(null);

  useEffect(() => {
    const affiliateCode = searchParams.get('affiliate');
    
    // Only process if we have an affiliate code and it's different from what we've already processed
    if (affiliateCode && affiliateCode !== processedCodeRef.current) {
      processedCodeRef.current = affiliateCode;
      
      // First validate the affiliate code
      AffiliateService.validateCode(affiliateCode)
        .then((validationData) => {
          if (validationData?.valid) {
            // Track the visit
            AffiliateService.trackVisit(affiliateCode)
              .then((trackingData) => {
                // Store affiliate code in sessionStorage
                sessionStorage.setItem('affiliateCode', affiliateCode);

                // Get the affiliate data from the validation response
                const affiliateData = validationData.affiliate;

                // Set affiliate mode in context with the affiliate data
                setAffiliateMode({
                  code: affiliateCode,
                  affiliate: affiliateData
                });
                
                // Set default locations if provided
                if (affiliateData?.defaultPickupLocation?.address) {
                  setPickupDetails(affiliateData.defaultPickupLocation);
                }
                
                if (affiliateData?.defaultDropoffLocation?.address) {
                  setDropoffDetails(affiliateData.defaultDropoffLocation);
                }
                
                // Store preferred service and pricing to set later when services are loaded
                if (affiliateData?.preferredService) {
                  preferredServiceRef.current = {
                    serviceType: affiliateData.preferredService,
                    pricing: affiliateData.servicePricing,
                  };
                }
                
                // If there's a specific redirect path and it's different from current path
                if (trackingData?.redirectPath && trackingData.redirectPath !== window.location.pathname) {
                  navigate(trackingData.redirectPath);
                }
              })
              .catch((error) => {
                console.error('Error tracking affiliate visit:', error);
              });
          }
        })
        .catch((error) => {
          console.error('Invalid affiliate code:', error);
          // Remove invalid affiliate code from URL
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.delete('affiliate');
          navigate({ search: newSearchParams.toString() }, { replace: true });
        });
    }
  }, []); // Only run once on mount

  // Watch for services to load and set preferred service
  useEffect(() => {
    if (preferredServiceRef.current && services && services.length > 0) {
      const { serviceType, pricing } = preferredServiceRef.current;
      const preferredService = services.find(
        s => s.serviceType === serviceType
      );
      if (preferredService) {
        // Apply custom pricing if available
        const serviceWithCustomPricing = {
          ...preferredService,
          ...(pricing?.basePrice && { basePrice: pricing.basePrice }),
          ...(pricing?.minPassengers !== undefined && { minPassengers: pricing.minPassengers }),
          ...(pricing?.customDescription && { description: pricing.customDescription }),
        };
        setSelectedService(serviceWithCustomPricing);
        preferredServiceRef.current = null; // Clear after setting
      }
    }
  }, [services, setSelectedService]);

  return null;
};

export default AffiliateHandler;