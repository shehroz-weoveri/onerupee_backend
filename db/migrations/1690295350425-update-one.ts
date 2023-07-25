import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOne1690295350425 implements MigrationInterface {
    name = 'UpdateOne1690295350425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "deviceId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deviceId"`);
    }

}
