export default function InboxPage() {
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center p-8">
      <div className="w-full max-w-[414px] min-h-[896px] bg-white rounded-[40px] shadow-[0_10px_30px_rgba(0,0,0,0.2)] overflow-hidden relative">
        <main className="h-full overflow-y-auto pb-24 no-scrollbar">
          <div className="p-4 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">📬</div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">ইনবক্স</h1>
              <p className="text-slate-600">শীঘ্রই আসছে...</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}


