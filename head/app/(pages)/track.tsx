import {
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  Clock,
  Coffee,
  Hamburger,
  MapPin,
  PersonStanding,
  School as SchoolIcon,
  Shield,
  Users
} from "lucide-react-native";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View
} from "react-native";

import * as Location from 'expo-location';
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from 'react-native-webview';
import { router } from "expo-router";

type School = {
  id: string;
  name: string;
  location?: {
    lat: number;
    lon: number;
  };
};

const TIMELINE = [
  {
    id: "1",
    title: "School Arrival time",
    time: "07:00 AM",
    detail: "Safe zone entry",
    icon: MapPin,
  },
  {
    id: "2",
    title: "Assembly",
    time: "07:40 AM",
    detail: "On campus",
    icon: Users,
  },
  {
    id: "3",
    title: "Recess",
    time: "10:00 AM",
    detail: "On campus",
    icon: Coffee,
  },
  {
    id: "4",
    title: "Lunch Time",
    time: "12:00 PM",
    detail: "On campus",
    icon: Hamburger,
  },
  {
    id: "5",
    title: "School Closure",
    time: "02:30 PM",
    detail: "Safe zone exit",
    icon: AlertTriangle,
  },
];

const toSafeCoordinate = (value: number | null | undefined) => (
  typeof value === "number" && Number.isFinite(value) ? value : 0
);

export default function TrackScreen() {
  const [, setLoading] = useState(false);
  const [school, setSchool] = useState<School | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [, requestPermission] = Location.useForegroundPermissions();
  const mapWebViewRef = useRef<any>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const mapHtml = useMemo(() => `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="https://unpkg.com/lucide@0.564.0/dist/umd/lucide.min.js"></script>
  <style>
    html, body, #map { margin: 0; padding: 0; width: 100%; height: 100%; }
    .custom-lucide-marker-wrapper { background: transparent; border: 0; }
    .marker-pill {
      width: 34px;
      height: 34px;
      border-radius: 17px;
      border: 2px solid #ffffff;
      box-shadow: 0 6px 14px rgba(15, 23, 42, 0.22);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
    }
    .marker-pill svg {
      width: 18px;
      height: 18px;
      stroke-width: 2.3;
    }
    .marker-user { background-color: #2563eb; }
    .marker-school { background-color: #16a34a; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var fallbackCenter = [9.0765, 7.3986];
    var map = L.map('map').setView(fallbackCenter, 12);
    var userMarker = null;
    var schoolMarker = null;
    var routeLine = null;
    var hasInitialFit = false;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    function hasCoord(lat, lon) {
      return Number.isFinite(lat) && Number.isFinite(lon) && (lat !== 0 || lon !== 0);
    }

    function makeIcon(iconName, variantClass) {
      return L.divIcon({
        className: 'custom-lucide-marker-wrapper',
        html: '<div class="marker-pill ' + variantClass + '"><i data-lucide="' + iconName + '"></i></div>',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18]
      });
    }

    function renderLucide() {
      if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons({
          attrs: {
            stroke: 'currentColor'
          }
        });
      }
    }

    window.updateMapData = function(userLat, userLon, schoolLat, schoolLon) {
      var points = [];
      var hasUser = hasCoord(userLat, userLon);
      var hasSchool = hasCoord(schoolLat, schoolLon);

      if (hasUser) {
        if (!userMarker) {
          userMarker = L.marker([userLat, userLon], {
            icon: makeIcon('person-standing', 'marker-user')
          }).addTo(map).bindPopup('You');
        } else {
          userMarker.setLatLng([userLat, userLon]);
        }
        points.push([userLat, userLon]);
      } else if (userMarker) {
        map.removeLayer(userMarker);
        userMarker = null;
      }

      if (hasSchool) {
        if (!schoolMarker) {
          schoolMarker = L.marker([schoolLat, schoolLon], {
            icon: makeIcon('school', 'marker-school')
          }).addTo(map).bindPopup('School');
        } else {
          schoolMarker.setLatLng([schoolLat, schoolLon]);
        }
        points.push([schoolLat, schoolLon]);
      } else if (schoolMarker) {
        map.removeLayer(schoolMarker);
        schoolMarker = null;
      }

      if (routeLine) {
        map.removeLayer(routeLine);
        routeLine = null;
      }

      if (points.length === 2) {
        routeLine = L.polyline(points, {
          color: '#2563eb',
          weight: 3
        }).addTo(map);
      }

      if (!hasInitialFit && points.length > 0) {
        if (points.length === 2) {
          map.fitBounds(points, { padding: [40, 40], maxZoom: 14 });
        } else {
          map.setView(points[0], 13);
        }
        hasInitialFit = true;
      }

      renderLucide();
    };
  </script>
</body>
</html>`, []);

  const fetchCurrentLocation = useCallback(async () => {
    try {
      const permissionResponse = await requestPermission();
      if (!permissionResponse.granted) {
        ToastAndroid.show("Permission to access location was denied", ToastAndroid.SHORT);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation(currentLocation);
    } catch (error) {
      console.error('Error fetching current location:', error);
      ToastAndroid.show("Error fetching current location", ToastAndroid.SHORT);
    }
  }, [requestPermission]);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const startWatching = async () => {
      const permissionResponse = await requestPermission();
      if (!permissionResponse.granted) return;

      subscription = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 10,
      }, (newLocation) => {
        setLocation(newLocation);
      });
    };

    startWatching();

    return () => {
      subscription?.remove();
    };
  }, [requestPermission]);

  const fetchSchool = useCallback(async () => {
    setLoading(true);
    try {
      const dummySchool: School = {
        id: 'school-001',
        name: 'Demo International School',
        location: {
          lat: 9.0765,
          lon: 7.3986,
        },
      };
      setSchool(dummySchool);
    } catch (error) {
      console.error('Error fetching school:', error);
      ToastAndroid.show("Error fetching school information", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchool();
  }, [fetchSchool]);

  const handleRefresh = useCallback(async () => {
    await Promise.all([fetchSchool(), fetchCurrentLocation()]);
  }, [fetchCurrentLocation, fetchSchool]);

  const startCoordinate = {
    latitude: toSafeCoordinate(location?.coords.latitude),
    longitude: toSafeCoordinate(location?.coords.longitude),
  };

  const destinationCoordinate = {
    latitude: toSafeCoordinate(school?.location?.lat),
    longitude: toSafeCoordinate(school?.location?.lon),
  };

  useEffect(() => {
    if (!isMapReady || !mapWebViewRef.current) {
      return;
    }

    mapWebViewRef.current.injectJavaScript(`
      if (window.updateMapData) {
        window.updateMapData(${startCoordinate.latitude}, ${startCoordinate.longitude}, ${destinationCoordinate.latitude}, ${destinationCoordinate.longitude});
      }
      true;
    `);
  }, [
    destinationCoordinate.latitude,
    destinationCoordinate.longitude,
    isMapReady,
    startCoordinate.latitude,
    startCoordinate.longitude,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.backgroundLayer}>
        <View style={styles.backgroundCircleTop} />
        <View style={styles.backgroundCircleBottom} />
      </View>

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Track</Text>
          <Text style={styles.headerSubtitle}>Live location for Wards</Text>
        </View>
        <TouchableOpacity style={styles.headerChip} activeOpacity={0.8} onPress={() => router.back()}>
          <ArrowLeft size={16} color="#fff" />
          <Text style={styles.headerChipText}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
      >
        <WebView
          ref={mapWebViewRef}
          style={styles.map}
          originWhitelist={['*']}
          onLoadEnd={() => setIsMapReady(true)}
          source={{ html: mapHtml }}
        />

        <View style={styles.pinLegendContainer}>
          <View style={styles.pinLegendCard}>
            <View style={[styles.pinLegendIconWrap, { backgroundColor: "#dbeafe" }]}>
              <PersonStanding size={18} color="#2563eb" />
            </View>
            <View style={styles.pinLegendTextWrap}>
              <Text style={styles.pinLegendTitle}>You</Text>
              <Text style={styles.pinLegendSubtitle}>PersonStanding marker shows your location</Text>
            </View>
          </View>

          <View style={styles.pinLegendCard}>
            <View style={[styles.pinLegendIconWrap, { backgroundColor: "#dcfce7" }]}>
              <SchoolIcon size={18} color="#16a34a" />
            </View>
            <View style={styles.pinLegendTextWrap}>
              <Text style={styles.pinLegendTitle}>School</Text>
              <Text style={styles.pinLegendSubtitle}>School marker shows the school location</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={[styles.submitButton, { marginBottom: 0, marginTop: 20 }]} activeOpacity={0.8} onPress={handleRefresh}>
          <Text style={styles.submitButtonText}>Refresh Location</Text>
        </TouchableOpacity>

        {/* school timeline */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>School Timeline</Text>
            <View style={styles.sectionBadge}>
              <Clock size={14} color="#0f172a" />
              <Text style={styles.sectionBadgeText}>{TIMELINE.length} events</Text>
            </View>
          </View>

          <View style={styles.timelineCard}>
            {TIMELINE.map((item, index) => {
              const Icon = item.icon;
              const isLast = index === TIMELINE.length - 1;
              return (
                <View key={item.id} style={styles.timelineRow}>
                  <View style={styles.timelineIconWrap}>
                    <Icon size={16} color="#0f766e" />
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle}>{item.title}</Text>
                    <Text style={styles.timelineDetail}>{item.detail}</Text>
                  </View>
                  <Text style={styles.timelineTime}>{item.time}</Text>
                  {!isLast && <View style={styles.timelineDivider} />}
                </View>
              );
            })}
          </View>
        </View>

        {/* safe zones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safe zones</Text>
          <TouchableOpacity style={styles.zoneCard} activeOpacity={0.8}>
            <View style={styles.zoneIconWrap}>
              <Shield size={18} color="#fff" />
            </View>
            <View style={styles.zoneTextWrap}>
              <Text style={styles.zoneTitle}>School Campus</Text>
              <Text style={styles.zoneSubtitle}>Active 7:30 AM - 4:30 PM</Text>
            </View>
            <ChevronRight size={18} color="#94a3b8" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  backgroundLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundCircleTop: {
    position: "absolute",
    top: -120,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "#dbeafe",
    opacity: 0.7,
  },
  backgroundCircleBottom: {
    position: "absolute",
    bottom: -140,
    left: -90,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#dcfce7",
    opacity: 0.6,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0f172a",
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#64748b",
  },
  headerChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#009966",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 6,
  },
  headerChipText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  map: {
    width: "100%",
    height: 500,
    marginTop: 8,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#dbeafe",
    backgroundColor: "#e2e8f0",
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
    position: 'relative',
  },
  pinLegendContainer: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },
  pinLegendCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  pinLegendIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  pinLegendTextWrap: {
    flex: 1,
  },
  pinLegendTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
  },
  pinLegendSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: "#64748b",
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  sectionLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  sectionLinkText: {
    fontSize: 12,
    color: "#64748b",
  },
  sectionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  sectionBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0f172a",
  },
  timelineCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    gap: 12,
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  timelineIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor: "#ecfdf3",
    alignItems: "center",
    justifyContent: "center",
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0f172a",
  },
  timelineDetail: {
    marginTop: 2,
    fontSize: 12,
    color: "#64748b",
  },
  timelineTime: {
    fontSize: 12,
    color: "#64748b",
  },
  timelineDivider: {
    position: "absolute",
    left: 16,
    bottom: -10,
    width: 1,
    height: 10,
    backgroundColor: "#e2e8f0",
  },
  zoneCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    marginVertical: 12,
  },
  zoneIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#0f766e",
    alignItems: "center",
    justifyContent: "center",
  },
  zoneTextWrap: {
    flex: 1,
  },
  zoneTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
  },
  zoneSubtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#64748b",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    marginTop: 12,
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 6,
    marginLeft: 2,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#0f172a",
    fontWeight: "500",
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
    paddingVertical: 6,
  },
  submitButton: {
    backgroundColor: "#009966",
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.2,
  },
  childrenSelectWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
    marginBottom: 2,
  },
  childOption: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  childOptionSelected: {
    backgroundColor: '#009966',
    borderColor: '#009966',
  },
  childOptionText: {
    color: '#64748b',
    fontWeight: '600',
    fontSize: 14,
  },
  childOptionTextSelected: {
    color: '#fff',
  },
  selectDropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 32,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    zIndex: 999,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 48,
    overflowY: 'auto',
    maxHeight: 180,
  },
  selectOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectOptionText: {
    fontSize: 15,
    color: '#0f172a',
  },
});
