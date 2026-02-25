import { RecordManager } from "@/components/admin/RecordManager";
import { getRecords } from "@/app/actions/recordActions";

export const dynamic = 'force-dynamic';

export default async function AdminRecordsPage() {
    const records = await getRecords();

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">後台管理系統 - 工程實績</h1>
                    <p className="mt-2 text-sm text-gray-600">管理新增、編輯與刪除工程實績資料</p>
                </div>
                <RecordManager initialRecords={records} />
            </div>
        </div>
    );
}
