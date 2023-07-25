import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTwo1690295610518 implements MigrationInterface {
    name = 'UpdateTwo1690295610518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "winner" boolean`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deviceId" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deviceId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "winner"`);
    }

}
