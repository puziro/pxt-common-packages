namespace jacdac {
    //% fixedInstances
    export class ServoClient extends ActuatorClient {
        constructor(requiredDevice: string = null) {
            super("servo", jd_class.SERVO, 5, requiredDevice);
        }

        /**
         * Set the servo angle
         */
        //% group="Servos"
        //% weight=100
        //% blockId=jdservoservosetangle block="jacdac set %servo angle to %degrees=protractorPicker °"
        //% degrees.defl=90
        //% servo.fieldEditor="gridpicker"
        //% servo.fieldOptions.width=220
        //% servo.fieldOptions.columns=2
        //% blockGap=8        
        setAngle(degrees: number) {
            if (!this.state[0] || this.state.getNumber(NumberFormat.Int16LE, 1) != degrees) {
                this.state[0] = 1;
                this.state.setNumber(NumberFormat.Int16LE, 1, degrees);
                this.notifyChange();
            }
        }

        /**
         * Set the throttle on a continuous servo
         * @param speed the throttle of the motor from -100% to 100%
         */
        //% group="Servos"
        //% weight=99
        //% blockId=jdservoservorun block="jacdac continuous %servo run at %speed=speedPicker \\%"
        //% servo.fieldEditor="gridpicker"
        //% servo.fieldOptions.width=220
        //% servo.fieldOptions.columns=2
        run(speed: number): void {
            this.setAngle(Math.map(speed, -100, 100, 0, 180));
        }

        /*
         * Set the pulse width to the servo in microseconds
         */
        //% group="Servos"
        //% weight=10 help=servos/set-pulse
        //% blockId=jdservoservosetpulse block="jacdac set %servo pulse to %micros μs"
        //% micros.min=500 micros.max=2500
        //% micros.defl=1500
        //% servo.fieldEditor="gridpicker"
        //% servo.fieldOptions.width=220
        //% servo.fieldOptions.columns=2
        //% parts=microservo trackArgs=0
        setPulse(micros: number) {
            micros = micros | 0;
            micros = Math.clamp(500, 2500, micros);
            if (this.state.getNumber(NumberFormat.UInt16LE, 3) != micros) {
                this.state.setNumber(NumberFormat.UInt16LE, 3, micros);
                this.notifyChange();
            }
        }
    }

    //% fixedInstance whenUsed block="servo client"
    export const servoClient = new ServoClient();
}