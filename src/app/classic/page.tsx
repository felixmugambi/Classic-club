// app/classic/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserCircle, FaTshirt, FaSignOutAlt, FaPlus } from 'react-icons/fa';
import { MdStars } from 'react-icons/md';
import { X } from 'lucide-react';
import { useAuth } from '../../components/context/AuthContext';
import API from '../../api/axios';
import Image from 'next/image';
import ConfirmModal from '../../components/confirm/ConfirmModal';

type FanProfile = {
  id: number;
  favorite_player: number | null;
  favorite_player_name?: string;
  jersey_number: number;
  fan_message?: string;
  profile_picture?: string;
};

type Player = {
  id: number;
  name: string;
  jersey_number: number;
  position: string;
  photo: string;
};

export default function MyClassicPage() {
  const router = useRouter();
  const { isAuthenticated, user, loading, logout } = useAuth();

  const [profile, setProfile] = useState<FanProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const [showPlayerPicker, setShowPlayerPicker] = useState(false);

  // form state inside modal
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [jerseyNumber, setJerseyNumber] = useState('');
  const [fanMessage, setFanMessage] = useState('');

  const [isOpen, setIsOpen] = useState(false)



  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, loading, router]);

  // Fetch fan profile
  useEffect(() => {
    const fetchProfile = async () => {

      if (isAuthenticated) {
        try {
          const res = await API.get("/fan_profile/me/");
          setProfile(res.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoadingProfile(false);
        }
      } else {
        setLoadingProfile(false);
      }
    };
    fetchProfile();
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await API.get("/players/public/");
        setPlayers(res.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);



  const handleSaveFavoritePlayer = async () => {
    if (!selectedPlayer || !profile) return;

    try {
      const res = await API.patch(`/fan_profile/me/`, {
        favorite_player: selectedPlayer.id,
        jersey_number: jerseyNumber || profile.jersey_number,
        fan_message: fanMessage,
      });
      setProfile(res.data);
      setShowPlayerPicker(false);
      setSelectedPlayer(null);
      setJerseyNumber('');
      setFanMessage('');
    } catch (err) {
      console.error("Error saving favorite player", err);
    }
  };

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)

    router.push("/auth/login");
  }

  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4 relative">
            {profile?.profile_picture ? (
              <img
                src={profile.profile_picture}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border"
              />
            ) : (
              <div className="relative">
                <FaUserCircle className="text-6xl text-gray-500" />
                <button
                  className="absolute -bottom-1 -right-1 bg-clubRed text-white p-1 rounded-full shadow hover:bg-red-700"
                  title="Add Profile Picture"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Welcome, {user?.name || 'Fan'}!
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <MdStars className="text-yellow-500" />
                <span className="text-yellow-600 font-semibold">My Classic Fan</span>
              </div>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <button className="bg-clubRed text-white px-4 py-2 rounded shadow hover:bg-red-800 transition">
              Become a Member
            </button>
            <button
              className="text-red-600 hover:text-red-800 flex items-center gap-1"
              onClick={() => setIsOpen(true)}
            >
              <FaSignOutAlt /> Logout
            </button>

            <ConfirmModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={handleLogout}
                title="Logout?"
                description="You will be logged out."
                confirmText="Logout"
                cancelText="Cancel"
              />
          </div>
        </div>

        {/* Jersey & Favorite Player Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <FaTshirt className="text-7xl text-clubRed" />
            <h3 className="text-lg font-bold text-gray-800">{user?.name || 'Fan'}’s Jersey</h3>
            <p className="text-gray-600 text-sm">
              Jersey No. <span className="font-semibold">{profile?.jersey_number || 0}</span>
            </p>

            {profile?.favorite_player_name ? (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  {profile.favorite_player ? (
                    <Image
                      src={
                        players.find((p) => Number(p.id) === Number(profile.favorite_player))?.photo
                        || "/default-player.png"
                      }
                      alt={profile.favorite_player_name}
                      width={48}
                      height={48}
                      className="rounded-full border object-cover"
                    />
                  ) : (
                    <FaUserCircle className="text-4xl text-gray-400" />
                  )}
                  <div className="text-left">
                    <p className="font-semibold">{profile.favorite_player_name}</p>
                    <p className="text-sm text-gray-500">
                      #{profile.jersey_number || "—"}
                    </p>
                  </div>
                </div>
                <button
                  className="text-blue-600 hover:underline text-sm mt-1"
                  onClick={() => setShowPlayerPicker(true)}
                >
                  Edit Favorite Player
                </button>
              </div>
            ) : (
              <button
                className="bg-gray-100 px-4 py-2 rounded-md shadow hover:bg-gray-200 flex items-center gap-2"
                onClick={() => setShowPlayerPicker(true)}
              >
                <FaPlus /> Add Favorite Player
              </button>
            )}



            {profile?.fan_message && (
              <p className="text-gray-500 italic text-sm">"{profile.fan_message}"</p>
            )}
          </div>
        </div>

        {/* Player Picker Modal */}
        {showPlayerPicker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">

              {/* Close button */}
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
                onClick={() => setShowPlayerPicker(false)}
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-bold mb-4">Select Your Favorite Player</h3>

              {!selectedPlayer ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {players.map((player) => (
                    <div
                      key={player.id}
                      className="relative border rounded-lg shadow hover:shadow-lg overflow-hidden group"
                    >
                      <div className="w-full h-48 relative">
                        <Image
                          src={player.photo}
                          alt={player.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-2 text-center">
                        <h4 className="font-semibold">{player.name}</h4>
                        <p className="text-sm text-gray-500">#{player.jersey_number}</p>
                        <button
                          className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                          onClick={() => setSelectedPlayer(player)}
                        >
                          <FaPlus className="inline mr-1" /> Select
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={selectedPlayer.photo}
                      alt={selectedPlayer.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{selectedPlayer.name}</h4>
                      <p className="text-sm text-gray-500">#{selectedPlayer.jersey_number}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">Jersey Number</label>
                      <input
                        type="number"
                        value={jerseyNumber}
                        onChange={(e) => setJerseyNumber(e.target.value)}
                        className="w-full border rounded-lg p-2 mt-1"
                        placeholder={profile?.jersey_number?.toString() || "Enter jersey number"}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Fan Message</label>
                      <textarea
                        value={fanMessage}
                        onChange={(e) => setFanMessage(e.target.value)}
                        className="w-full border rounded-lg p-2 mt-1"
                        rows={3}
                        placeholder="Your message of support..."
                      />
                    </div>
                    <button
                      className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
                      onClick={handleSaveFavoritePlayer}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Fan Activity Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Fan Activity</h3>
          <p className="text-sm text-gray-500">
            More fan engagement features like predictions, competitions, and stats coming soon!
          </p>
        </div>
      </div>
    </div>
  );
}
